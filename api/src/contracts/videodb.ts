export type Video = {
  title: string;
  category: string;
  watched: string;
  director?: string;
  num_episodes?: number;
  length_mins?: number;
  priority_flag?: number;
  progress?: string;
  year?: number;
  imdb_id?: string;
  image_url?: string;
  actors?: string;
  plot?: string;
  tags?: string[];
  primary_media_type?: string;
  primary_media_location?: string;
  primary_media_watched?: string;
  other_media_type?: string;
  other_media_location?: string;
  media_notes?: string;
};

export type VideoWithId = Video & { id: number };

export type PaginatedVideos = {
  videos: VideoWithId[];
  currentPage: number;
  totalPages: number;
};

export type VideoUpdate = {
  id: number;
  priority_flag: 0 | 1;
};
