import path from 'path';
import { Logger } from 'winston';

import { DatabaseAdapter } from '@/adapters/DatabaseAdapter';
import { StorageAdapter } from '@/adapters/StorageAdapter';
import { User } from '@/contracts/auth';
import { PaginatedVideos, Video, VideoUpdate, VideoWithId } from '@/contracts/videodb';
import { NotFoundError, NotPermittedError } from '@/errors';
import { userIsAdmin } from '@/services/auth/utils/access';
import { Config, pShuffle } from '@/utils';

import { dbUpgradeSql } from './dbUpgradeSql';

const videoFields = [
  'title',
  'category',
  'director',
  'num_episodes',
  'length_mins',
  'watched',
  'priority_flag',
  'progress',
  'imdb_id',
  'image_url',
  'year',
  'actors',
  'plot',
  'primary_media_type',
  'primary_media_location',
  'primary_media_watched',
  'other_media_type',
  'other_media_location',
  'media_notes',
];

export const videoWithIdFields = ['id', ...videoFields];

export enum LookupTables {
  video_category = 'l_categories',
  video_media_type = 'l_media_types',
  video_media_location = 'l_media_locations',
  video_watched_status = 'l_watched_status',
}

export type LookupRow = {
  code: string;
  description: string;
};

export type LookupValues = {
  [key: string]: string;
};

export type VideoFilters = {
  maxLength?: number;
  categories?: string[];
  tags?: string[];
  titleContains?: string;
  watched?: string;
  mediaWatched?: string;
  minResolution?: string;
  flaggedOnly?: boolean;
  hasProgressNotes?: boolean;
  primaryMediaType?: string;
  // the following are not in the corresponding UI type
  videoIds?: number[];
  sortOrder?: string;
  shuffleSeed?: number;
};

const wait = (timeMs: number) => new Promise((resolve) => setTimeout(resolve, timeMs));

const videoNullMapper = (video: Video) => ({
  title: video.title,
  category: video.category,
  watched: video.watched,
  director: video.director ?? undefined,
  num_episodes: video.num_episodes ?? undefined,
  length_mins: video.length_mins ?? undefined,
  priority_flag: video.priority_flag ?? undefined,
  progress: video.progress ?? undefined,
  year: video.year ?? undefined,
  imdb_id: video.imdb_id ?? undefined,
  image_url: video.image_url ?? undefined,
  actors: video.actors ?? undefined,
  plot: video.plot ?? undefined,
  tags: video.tags ?? undefined,
  primary_media_type: video.primary_media_type ?? undefined,
  primary_media_location: video.primary_media_location ?? undefined,
  primary_media_watched: video.primary_media_watched ?? undefined,
  other_media_type: video.other_media_type ?? undefined,
  other_media_location: video.other_media_location ?? undefined,
  media_notes: video.media_notes ?? undefined,
});

export const baseVideoSql = `SELECT v.${videoWithIdFields.join(', v.')},
                                    vt.tags
                             FROM   videos v
                             LEFT OUTER JOIN (
                                SELECT video_id, GROUP_CONCAT(tag, '|') AS tags
                                FROM   video_tags
                                GROUP BY video_id ) vt ON v.id =  vt.video_id`;

export const orderBySql = ` ORDER BY (
                              CASE WHEN UPPER(title) LIKE 'THE %' THEN UPPER(SUBSTR(title, 5))
                                  WHEN UPPER(title) LIKE 'AN %' THEN UPPER(SUBSTR(title, 4))
                                  WHEN UPPER(title) LIKE 'A %' THEN UPPER(SUBSTR(title, 3))
                                  ELSE UPPER(title)
                              END
                          )`;

export const filterSql = {
  maxLength: '(length_mins <= $maxLength)',
  titleContains: '(LOWER(title) LIKE $titleContains)',
  minHdResolution: "(primary_media_type IN ('BD4K', 'DL2160', 'BD', 'DL1080', 'DL720'))",
  minUhdResolution: "(primary_media_type IN ('BD4K', 'DL2160'))",
  flaggedOnly: '(priority_flag > 0)',
  hasProgressNotes: "(progress IS NOT NULL AND progress != '')",
  primaryMediaType: '(primary_media_type = $primaryMediaType)',
};

export class VideoDb {
  private apiPath: string;
  private initialising = false;
  private database?: DatabaseAdapter;
  private dbVersion?: number;
  private lookupTableCache: { [key: string]: LookupValues } = {};

  public constructor(
    apiPath: string,
    private config: Config,
    private logger: Logger,
    private storage: StorageAdapter,
  ) {
    this.apiPath = apiPath.replace(/^\//, '');
  }

  public async initialise(): Promise<void> {
    while (this.initialising) {
      this.logger.info('waiting for database to initialise');
      await wait(50);
    }

    if (!this.database) {
      this.initialising = true;
      this.logger.info(`initialising database at ${this.apiPath}`);
      const dbContentPath = path.join(this.apiPath, 'data.db');
      if (!this.storage.contentFileExists(dbContentPath)) {
        this.dbVersion = 0;
      }
      this.database = await this.storage.getContentDb(dbContentPath);
      await this.upgrade();
      this.initialising = false;
      this.logger.info(`initialised database at ${this.apiPath}`);
    }
  }

  private async upgrade(): Promise<void> {
    const latestVersion = dbUpgradeSql.length;
    this.dbVersion ??= await this.retrieveVersion();
    if (latestVersion > this.dbVersion) {
      for (const versionSql of dbUpgradeSql.slice(this.dbVersion)) {
        await this.database?.exec(versionSql);
      }
      await this.storeVersion(latestVersion);
    }
  }

  private async retrieveVersion(): Promise<number> {
    if (this.database) {
      const versionSql = 'SELECT IFNULL(MAX(version), 0) AS ver FROM db_version';
      const result = await this.database.get<{ ver: number }>(versionSql);
      if (result) {
        return result.ver;
      }
    }
    return 0;
  }

  public async getVersion(): Promise<number> {
    return this.dbVersion ?? 0;
  }

  public getOmdbApiKey(user?: User): string {
    this.throwIfNotAdmin(user);
    return this.config.omdbApiKey;
  }

  public async getLookupValues(tableSuffix: string): Promise<LookupValues> {
    const tableName = `l_${tableSuffix}` as LookupTables;
    if (!Object.values(LookupTables).includes(tableName)) {
      throw new Error(`invalid table suffix ${tableSuffix}`);
    }

    if (this.lookupTableCache[tableName]) {
      return this.lookupTableCache[tableName];
    }

    const sql = `SELECT code, description FROM ${tableName}`;
    const lookupRows = await this.database?.getAll<LookupRow>(sql);

    if (!lookupRows) {
      throw new Error(`No records found in ${tableName}`);
    }

    const returnVal: LookupValues = {};
    lookupRows.forEach((row) => {
      returnVal[row.code] = row.description;
    });
    this.lookupTableCache[tableName] = returnVal;

    return returnVal;
  }

  public async addVideo(video: Video, user?: User): Promise<number> {
    this.throwIfNotAdmin(user);
    const sql = `INSERT INTO videos
                     (${videoFields.join(', ')})
                     VALUES
                     ($${videoFields.join(', $')})
                     RETURNING id`;

    const params: { [key: string]: unknown } = {};
    videoFields.forEach((key) => {
      params[`$${key}`] = video[key as keyof Video] ?? null;
    });

    const result = await this.database?.getWithParams<{ id: number }>(sql, params);
    if (!result) {
      throw new Error('Unexpected error creating video');
    }

    await this.createOrReplaceVideoTags(result.id, video.tags);

    return result.id;
  }

  public async updateVideo(id: number, video: Video, user?: User): Promise<void> {
    this.throwIfNotAdmin(user);
    await this.throwIfNoVideo(id);

    const setList = videoFields.map((field) => `${field} = $${field}`);
    const sql = `UPDATE videos SET ${setList.join(', ')} WHERE id = $id`;

    const params: { [key: string]: unknown } = { $id: id };
    videoFields.forEach((key) => {
      params[`$${key}`] = video[key as keyof Video] ?? null;
    });

    await this.database?.runWithParams(sql, params);

    await this.createOrReplaceVideoTags(id, video.tags);
  }

  public async patchVideo(update: VideoUpdate, user?: User): Promise<void> {
    this.throwIfNotAdmin(user);

    const sql = `UPDATE videos
                     SET priority_flag = ${update.priority_flag}
                     WHERE id = ${update.id}`;

    await this.database?.exec(sql);
  }

  private async createOrReplaceVideoTags(id: number, tags?: string[]): Promise<void> {
    await this.deleteVideoTags(id);

    if (!tags || tags.length === 0) return;

    const insertSql = `INSERT INTO video_tags (video_id, tag)
                           VALUES ($id, $tag)`;

    for (const tag of tags) {
      const params = { $id: id, $tag: tag };
      await this.database?.runWithParams(insertSql, params);
    }
  }

  private async deleteVideoTags(id: number): Promise<void> {
    const deleteSql = `DELETE FROM video_tags WHERE video_id = ${id}`;
    await this.database?.exec(deleteSql);
  }

  public async getVideo(id: number): Promise<Video> {
    await this.throwIfNoVideo(id);
    const sql = `SELECT ${videoFields.join(', ')}
                     FROM   videos
                     WHERE  id = ${id}`;
    const video = await this.database?.get<Video>(sql);
    if (!video) {
      throw new Error(`Unexpected error getting video ${id}`);
    }
    const tags = await this.getVideoTags(id);
    if (tags && tags.length > 0) {
      video.tags = tags;
    }

    return videoNullMapper(video);
  }

  public async deleteVideo(id: number, user?: User): Promise<void> {
    this.throwIfNotAdmin(user);
    await this.throwIfNoVideo(id);

    await this.deleteVideoTags(id);

    const sql = `DELETE
                 FROM   videos
                 WHERE  id = ${id}`;
    await this.database?.exec(sql);
  }

  private async getVideoTags(id: number): Promise<string[] | undefined> {
    const sql = `SELECT tag FROM video_tags WHERE video_id = ${id} ORDER BY tag`;
    const tags = await this.database?.getAll<{ tag: string }>(sql);
    if (tags) {
      return tags.map((tagObj) => tagObj.tag);
    }
  }

  public async getAllTags(): Promise<string[]> {
    const sql = 'SELECT DISTINCT tag from video_tags ORDER BY tag';
    const tags = await this.database?.getAll<{ tag: string }>(sql);
    if (tags) {
      return tags.map((tagObj) => tagObj.tag);
    } else {
      return [];
    }
  }

  private buildVideoQuery(filters?: VideoFilters): {
    sql: string;
    params: Record<string, unknown>;
  } {
    let params: { [key: string]: unknown } = {};
    const whereClauses: string[] = [];
    let sql = baseVideoSql;

    const {
      maxLength,
      categories,
      tags,
      titleContains,
      watched,
      mediaWatched,
      minResolution,
      flaggedOnly,
      hasProgressNotes,
      videoIds,
      primaryMediaType,
    } = filters || {};

    if (maxLength !== undefined) {
      whereClauses.push(filterSql.maxLength);
      params['$maxLength'] = maxLength;
    }
    if (titleContains !== undefined) {
      whereClauses.push(filterSql.titleContains);
      params['$titleContains'] = `%${titleContains.toLowerCase()}%`;
    }
    if (minResolution === 'HD') {
      whereClauses.push(filterSql.minHdResolution);
    }
    if (minResolution === 'UHD') {
      whereClauses.push(filterSql.minUhdResolution);
    }
    if (flaggedOnly) {
      whereClauses.push(filterSql.flaggedOnly);
    }
    if (hasProgressNotes) {
      whereClauses.push(filterSql.hasProgressNotes);
    }
    if (primaryMediaType) {
      whereClauses.push(filterSql.primaryMediaType);
      params['$primaryMediaType'] = primaryMediaType;
    }

    if (categories !== undefined) {
      const categoryParams: { [key: string]: string } = {};
      categories.forEach((category, index) => {
        categoryParams['$category' + index.toString()] = category;
      });
      whereClauses.push(`(category IN (${Object.keys(categoryParams).join(', ')}))`);
      params = { ...params, ...categoryParams };
    }
    if (tags !== undefined) {
      const tagParams: { [key: string]: string } = {};
      tags.forEach((tag, index) => {
        tagParams['$tag' + index.toString()] = tag;
      });
      whereClauses.push(
        `(EXISTS (SELECT 1 FROM video_tags WHERE video_id = id AND tag IN (${Object.keys(tagParams).join(', ')})))`,
      );
      params = { ...params, ...tagParams };
    }
    if (watched === 'Y' || watched === 'N') {
      whereClauses.push(`(watched IN ('${watched}', 'P'))`);
    }
    if (mediaWatched === 'Y' || mediaWatched === 'N') {
      whereClauses.push(`(primary_media_watched IN ('${mediaWatched}', 'P'))`);
    }
    if (videoIds !== undefined) {
      const idParams: { [key: string]: number } = {};
      videoIds.forEach((id, index) => {
        idParams['$videoId' + index.toString()] = id;
      });
      whereClauses.push(`(id IN (${Object.keys(idParams).join(', ')}))`);
      params = { ...params, ...idParams };
    }

    if (whereClauses.length > 0) {
      sql += ` WHERE ${whereClauses.join(' AND ')}`;
    }

    sql += orderBySql;

    return { sql, params };
  }

  public async queryVideos(filters?: VideoFilters, requestedPages = 1): Promise<PaginatedVideos> {
    const { sql, params } = this.buildVideoQuery(filters);
    let videos = await this.database?.getAllWithParams<VideoWithId>(sql, params);

    if (!videos) {
      throw new Error('Unexpected error querying videos');
    }

    const { videoDbPageSize } = this.config;
    const totalPages = Math.ceil(videos.length / videoDbPageSize);
    const currentPage = Math.min(totalPages, requestedPages);

    const { sortOrder, shuffleSeed } = filters || {};
    const shuffle = sortOrder === 'shuffle' && shuffleSeed;
    const limit = currentPage * videoDbPageSize;

    if (shuffle) {
      videos = pShuffle(videos, shuffleSeed);
    }

    if (limit) {
      videos = videos.slice(0, limit);
    }

    videos = videos.map((video) => {
      const mappedVideo = videoNullMapper(video);
      if (!video.tags) {
        return { id: video.id, ...mappedVideo };
      }
      return {
        id: video.id,
        ...mappedVideo,
        tags: (video.tags as unknown as string)?.split('|'),
      };
    });

    return {
      videos,
      currentPage,
      totalPages,
    };
  }

  private throwIfNotAdmin(user?: User): void {
    if (this.config.enableAuthentication && !userIsAdmin(user)) throw new NotPermittedError();
  }

  private async throwIfNoVideo(id: number): Promise<void> {
    const sql = `SELECT COUNT() AS video_exists FROM videos WHERE id=${id}`;
    const result = await this.database?.get<{ video_exists: number }>(sql);
    if (!result || result.video_exists === 0) {
      throw new NotFoundError(`video id ${id} does not exist`);
    }
  }

  private async storeVersion(version: number): Promise<void> {
    const sql = `UPDATE db_version SET version = ${version};`;
    await this.database?.exec(sql);
    this.dbVersion = version;
  }

  public async shutdown(): Promise<void> {
    this.logger.info(`shutting down database at ${this.apiPath}`);
    await this.database?.close();
  }
}
