import { useCustomQuery } from '@/shared/hooks';

import { getCalibreDbBooks } from '../api';
import { useCalibreDb } from '../hooks/useCalibreDb';

const useApiPath = () => {
  const {
    state: { apiPath },
  } = useCalibreDb();
  return apiPath;
};

export const useBooks = () => {
  const apiPath = useApiPath();

  return useCustomQuery({
    queryKey: ['calibredb', 'books', apiPath],
    queryFn: () => getCalibreDbBooks(apiPath),
  });
};
