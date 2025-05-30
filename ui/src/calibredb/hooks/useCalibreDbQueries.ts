import { useCustomQuery } from '@/shared/hooks';

import { getCalibreDbBookPaths, getCalibreDbBooks, getCalibreDbLookup } from '../api';
import { useCalibreDb } from '../hooks/useCalibreDb';

const useApiPath = () => {
  const {
    state: { apiPath },
  } = useCalibreDb();
  return apiPath;
};

export const useBooks = () => {
  const {
    state: { apiPath, pages, apiFilters },
  } = useCalibreDb();

  return useCustomQuery({
    queryKey: ['calibredb', 'books', apiPath, JSON.stringify(apiFilters), pages],
    queryFn: () => getCalibreDbBooks(apiPath, apiFilters, pages),
  });
};

export const useBookPaths = () => {
  const {
    state: {
      apiPath,
      apiFilters: { devices },
    },
  } = useCalibreDb();

  return useCustomQuery({
    queryKey: ['calibredb', 'book-paths', apiPath, JSON.stringify(devices)],
    queryFn: () => getCalibreDbBookPaths(apiPath, devices),
  });
};

export const useLookup = (lookupTable: string) => {
  const apiPath = useApiPath();

  return useCustomQuery({
    queryKey: ['videoDb', 'lookup', apiPath, lookupTable],
    queryFn: () => getCalibreDbLookup(apiPath, lookupTable),
    staleTime: 60 * 60 * 1000,
    refetchInterval: 60 * 60 * 1000,
  });
};

export const useLookupValue = (lookupTable: string, value?: number) => {
  const lookup = useLookup(lookupTable);
  return lookup[value ?? ''];
};
