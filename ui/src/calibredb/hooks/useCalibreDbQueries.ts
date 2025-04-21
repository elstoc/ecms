import { useCustomQuery } from '@/shared/hooks';

import { getCalibreDbBooks } from '../api';
import { useCalibreDb } from '../hooks/useCalibreDb';

export const useBooks = () => {
  const {
    state: { apiPath, pages },
  } = useCalibreDb();

  return useCustomQuery({
    queryKey: ['calibredb', 'books', apiPath, pages],
    queryFn: () => getCalibreDbBooks(apiPath, pages),
  });
};
