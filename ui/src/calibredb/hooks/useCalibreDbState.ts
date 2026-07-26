import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';

import { KeyValueOfType, getRandomSeed, toIntOrUndefined } from '@/utils';

import { CalibreDbProviderValue } from '../components/CalibreDbProvider';

import { BookFilters, CalibreDbState } from './useCalibreDb';

const defaultDevices = ['kobo', 'tablet', 'physical'];
const defaultSortOrder = 'title';
const defaultMode = 'browse';

type UseCalibreDbStateProps = { title: string; apiPath: string };

export const useCalibreDbState = ({
  title,
  apiPath,
}: UseCalibreDbStateProps): CalibreDbProviderValue => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [shuffleSeed, setShuffleSeed] = useState(1);
  const [pages, setPages] = useState(1);

  const mode = useMemo<string>(() => searchParams.get('mode') || defaultMode, [searchParams]);

  const apiFilters = useMemo<BookFilters>(
    () => ({
      titleContains: searchParams.get('titleContains') || undefined,
      author: toIntOrUndefined(searchParams.get('author')),
      format: toIntOrUndefined(searchParams.get('format')),
      bookPath: searchParams.get('bookPath') || undefined,
      exactPath: mode === 'browse',
      readStatus:
        searchParams.get('readStatus') === null
          ? undefined
          : searchParams.get('readStatus') === '1',
      sortOrder: searchParams.get('sortOrder') || defaultSortOrder,
      devices: searchParams.get('devices')?.split('|') || ['kobo', 'tablet', 'physical'],
    }),
    [mode, searchParams],
  );

  const updateFilter = useCallback(
    ({ key, value }: KeyValueOfType<BookFilters>) => {
      let newSearchParamValue: string | undefined;

      if (key === 'devices') {
        const onlyDefaultDevicesSelected =
          value?.length === defaultDevices.length &&
          value.every((device) => defaultDevices.includes(device));
        if (!value || onlyDefaultDevicesSelected) {
          newSearchParamValue = undefined;
        } else {
          newSearchParamValue = value.join('|');
        }
      } else if (key === 'sortOrder') {
        newSearchParamValue = value === defaultSortOrder ? undefined : value;
        if (value === 'shuffle') {
          setShuffleSeed(getRandomSeed());
        }
      } else if (key === 'author' || key === 'format') {
        newSearchParamValue = value?.toString();
      } else if (key === 'exactPath') {
        newSearchParamValue = value ? undefined : '1';
      } else if (key === 'readStatus') {
        if (value === undefined) {
          newSearchParamValue = undefined;
        } else {
          newSearchParamValue = value ? '1' : '0';
        }
      } else if (key === 'titleContains' || key === 'bookPath') {
        newSearchParamValue = value;
      }

      setSearchParams(
        (params) => {
          if (newSearchParamValue === undefined) {
            params.delete(key);
          } else {
            params.set(key, newSearchParamValue);
          }
          return params;
        },
        { replace: mode === 'search' },
      );

      setPages(1);
    },
    [mode, setPages, setSearchParams],
  );

  const toggleMode = useCallback(() => {
    setSearchParams((params) => {
      const newMode = mode === 'browse' ? 'search' : 'browse';
      if (newMode === 'search') {
        params.set('mode', 'search');
      } else {
        // 'browse' mode is the default so has empty search params
        params.delete('mode');
      }
      return params;
    });
  }, [mode, setSearchParams]);

  const resetFilters = useCallback(() => {
    setSearchParams('', { replace: mode === 'search' });
    setPages(1);
    setShuffleSeed(1);
  }, [mode, setSearchParams]);

  const state: CalibreDbState = {
    title,
    apiPath,
    pages,
    shuffleSeed,
    mode: mode as 'browse' | 'search',
    apiFilters: apiFilters,
  };

  const apiQueryParams: Record<string, number | string | undefined> = {
    path: apiPath,
    pages: (pages || 1).toString(),
    ...apiFilters,
    exactPath: apiFilters.exactPath ? '1' : '0',
    readStatus: apiFilters.readStatus == null ? undefined : apiFilters.readStatus ? '1' : '0',
    devices: apiFilters.devices?.join('|'),
    shuffleSeed: shuffleSeed?.toString(),
  };

  return { state, updateFilter, toggleMode, resetFilters, setPages, apiQueryParams };
};
