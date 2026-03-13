import { Book } from '@/contracts/calibredb';
import { useCustomQuery } from '@/shared/hooks';

import { getCalibreDbBookPaths, getCalibreDbBooks, getCalibreDbLookup } from '../api';
import { useCalibreDb } from '../hooks/useCalibreDb';

const emptyBooks: Book[] = [];

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

  const books = useCustomQuery({
    queryKey: ['calibredb', 'books', apiPath, JSON.stringify(apiFilters), pages],
    queryFn: () => getCalibreDbBooks(apiPath, apiFilters, pages),
  });

  return (
    books ?? {
      books: emptyBooks,
      currentPage: 1,
      totalPages: 1,
      childPaths: {},
    }
  );
};

const emptyBookPaths: Record<string, string> = {};

export const useBookPaths = () => {
  const {
    state: {
      apiPath,
      apiFilters: { devices },
    },
  } = useCalibreDb();

  const bookPaths = useCustomQuery({
    queryKey: ['calibredb', 'book-paths', apiPath, JSON.stringify(devices)],
    queryFn: () => getCalibreDbBookPaths(apiPath, devices),
  });

  return bookPaths ?? emptyBookPaths;
};

const emptyLookup: Record<string, string> = {};

export const useLookup = (lookupTable: string) => {
  const apiPath = useApiPath();

  const lookup = useCustomQuery({
    queryKey: ['videoDb', 'lookup', apiPath, lookupTable],
    queryFn: () => getCalibreDbLookup(apiPath, lookupTable),
  });

  return lookup ?? emptyLookup;
};

export const useLookupValue = (lookupTable: string, value?: number) => {
  const lookup = useLookup(lookupTable);
  return lookup[value ?? ''];
};
