/* eslint-disable @typescript-eslint/no-unused-vars */
import { KeyValueOfType, toIntOrUndefined } from '@/utils';

import { CalibreDbState } from '../hooks/useCalibreDb';

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

export const getStateFromUiSearchParams = (searchParams: URLSearchParams): SearchParamState => ({
  titleContains: searchParams.get('titleContains') || undefined,
  author: toIntOrUndefined(searchParams.get('author')),
  format: toIntOrUndefined(searchParams.get('format')),
  bookPath: searchParams.get('bookPath') || undefined,
  readStatus:
    searchParams.get('readStatus') == null ? undefined : searchParams.get('readStatus') === '1',
  sortOrder: searchParams.get('sortOrder') || defaultSortOrder,
  devices: searchParams.get('devices')?.split('|') || defaultDevices,
  mode: searchParams.get('mode') ?? defaultMode,
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
  devices: devices?.join('|'),
  exactPath: mode === 'browse' ? '1' : '0',
});

export const getUiSearchParamForKey = ({
  key,
  value,
}: KeyValueOfType<SearchParamState>): string | undefined => {
  if (key === 'titleContains' || key === 'bookPath' || key === 'author' || key === 'format') {
    return value?.toString();
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
};
