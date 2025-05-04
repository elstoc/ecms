import { PaginatedBooks } from '@/contracts/calibredb';
import { axiosSecureClient } from '@/shared/api';

import { BookFilters } from './hooks/useCalibreDb';

export const getCalibreDbBooks = async (
  path: string,
  filters: BookFilters,
  pages: number,
): Promise<PaginatedBooks> => {
  const url = 'calibredb/books';
  const { data } = await axiosSecureClient.get<PaginatedBooks>(url, {
    params: {
      path,
      pages: pages.toString(),
      ...filters,
      exactPath: filters.exactPath ? '1' : '0',
      readStatus: filters.readStatus == null ? undefined : filters.readStatus ? '1' : '0',
    },
  });

  return data;
};

export const getCalibreDbLookup = async (
  path: string,
  lookupTable: string,
): Promise<{ [key: string]: string }> => {
  const url = 'calibredb/lookup';
  const { data } = await axiosSecureClient.get<{ [key: string]: string }>(url, {
    params: { path, table: lookupTable },
  });
  return data;
};
