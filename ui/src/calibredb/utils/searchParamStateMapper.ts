/* eslint-disable @typescript-eslint/no-unused-vars */
import { KeyValueOfType, toIntOrUndefined } from '@/utils';

import { CalibreDbState } from '../components/CalibreDbProvider';

export type SearchParamState = {
  titleContains?: string;
  author?: number;
  format?: number;
  bookPath?: string;
  readStatus?: boolean;
  sortOrder: string;
  devices?: string[];
  mode: string;
};

type ApiQueryParams = Record<string, number | string | undefined>;

const defaultDevices = ['kobo', 'tablet', 'physical'];
const defaultSortOrder = 'title';
const defaultMode = 'browse';

export const getStateFromUiSearchParams = (params: URLSearchParams): SearchParamState => ({
  titleContains: params.get('titleContains') || undefined,
  bookPath: params.get('bookPath') || undefined,
  author: toIntOrUndefined(params.get('author')),
  format: toIntOrUndefined(params.get('format')),
  sortOrder: params.get('sortOrder') || defaultSortOrder,
  devices: params.get('devices')?.split('|') || defaultDevices,
  mode: params.get('mode') ?? defaultMode,
  readStatus: params.get('readStatus') == null ? undefined : params.get('readStatus') === '1',
});

export const getApiQueryParamsFromState = ({
  apiPath: path,
  title: _,
  readStatus,
  devices,
  mode,
  ...rest
}: CalibreDbState): ApiQueryParams => ({
  path,
  ...rest,
  readStatus: readStatus == null ? undefined : readStatus ? '1' : '0',
  exactPath: mode === 'browse' ? '1' : '0',
  devices: devices?.join('|'),
});

export const getUiSearchParamForKey = ({
  key,
  value,
}: KeyValueOfType<SearchParamState>): string | undefined => {
  if (key === 'titleContains' || key === 'bookPath' || key === 'author' || key === 'format') {
    return value?.toString();
  }

  if (key === 'sortOrder') {
    return value === defaultSortOrder ? undefined : value;
  }

  if (key === 'mode') {
    return value === defaultMode ? undefined : value;
  }

  if (key === 'readStatus') {
    if (value === undefined) {
      return undefined;
    }
    return value ? '1' : '0';
  }

  if (key === 'devices') {
    const onlyDefaultDevicesSelected =
      value?.length === defaultDevices.length &&
      value.every((device) => defaultDevices.includes(device));

    if (!value || onlyDefaultDevicesSelected) {
      return undefined;
    }

    return value.join('|');
  }
};
