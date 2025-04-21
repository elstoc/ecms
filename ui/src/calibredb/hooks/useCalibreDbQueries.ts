import { useCustomQuery } from '@/shared/hooks';

import { getCalibreDbBooks, getCalibreDbLookup } from '../api';
import { useCalibreDb } from '../hooks/useCalibreDb';

const useApiPath = () => {
  const {
    state: { apiPath },
  } = useCalibreDb();
  return apiPath;
};

export const useBooks = () => {
  const {
    state: { apiPath, pages },
  } = useCalibreDb();

  return useCustomQuery({
    queryKey: ['calibredb', 'books', apiPath, pages],
    queryFn: () => getCalibreDbBooks(apiPath, pages),
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
