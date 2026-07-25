import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';

import { KeyValueOfType, toIntOrUndefined } from '@/utils';

export type NewBookFilters = {
  titleContains?: string;
  author?: number;
  format?: number;
  bookPath?: string;
  exactPath?: boolean;
  readStatus?: boolean;
  sortOrder: string;
  devices?: string[];
};

type UseSearchParamMapperReturn = {
  bookFilters: NewBookFilters;
  mode: string;
  toggleMode: () => void;
  setBookFilter: (payload: KeyValueOfType<NewBookFilters>) => void;
  resetBookFilters: () => void;
};

const defaultDevices = ['kobo', 'tablet', 'physical'];
const defaultSortOrder = 'title';
const defaultMode = 'browse';

export const useSearchParamMapper = (): UseSearchParamMapperReturn => {
  const [searchParams, setSearchParams] = useSearchParams();

  const bookFilters = useMemo<NewBookFilters>(
    () => ({
      titleContains: searchParams.get('titleContains') || undefined,
      author: toIntOrUndefined(searchParams.get('author')),
      format: toIntOrUndefined(searchParams.get('format')),
      bookPath: searchParams.get('bookPath') || undefined,
      exactPath: searchParams.get('exactPath') === '1',
      readStatus: searchParams.get('readStatus') === '1',
      sortOrder: searchParams.get('sortOrder') || defaultSortOrder,
      devices: searchParams.get('devices')?.split('|') || ['kobo', 'tablet', 'physical'],
    }),
    [searchParams],
  );

  const mode = useMemo<string>(() => searchParams.get('mode') || defaultMode, [searchParams]);

  const setBookFilter = useCallback(
    ({ key, value }: KeyValueOfType<NewBookFilters>) => {
      let newSearchParamValue: string | undefined;

      if (key === 'devices') {
        if (!value || value?.every((device) => defaultDevices.includes(device))) {
          newSearchParamValue = undefined;
        } else {
          newSearchParamValue = value.join('|');
        }
      } else if (key === 'sortOrder') {
        newSearchParamValue = value === defaultSortOrder ? undefined : value;
      } else if (key === 'author' || key === 'format') {
        newSearchParamValue = value?.toString();
      } else if (key === 'exactPath' || key === 'readStatus') {
        newSearchParamValue = value ? undefined : '1';
      } else if (key === 'titleContains' || key === 'bookPath') {
        newSearchParamValue = value;
      }

      setSearchParams((params) => {
        if (newSearchParamValue === undefined) {
          params.delete(key);
        } else {
          params.set(key, newSearchParamValue);
        }
        return params;
      });
    },
    [setSearchParams],
  );

  const toggleMode = useCallback(() => {
    setSearchParams((params) => {
      const newMode = mode === 'browse' ? 'search' : 'browse';
      if (newMode === 'search') {
        params.set('exactPath', '0');
        params.set('mode', 'search');
      } else {
        // 'browse' mode is the default so has empty search params
        params.set('exactPath', '1');
        params.delete('mode');
      }
      return params;
    });
  }, [mode, setSearchParams]);

  const resetBookFilters = useCallback(() => {
    setSearchParams('');
  }, [setSearchParams]);

  return { bookFilters, mode, setBookFilter, toggleMode, resetBookFilters };
};
