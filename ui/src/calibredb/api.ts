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
      pages: (pages || 1).toString(),
      ...filters,
      exactPath: filters.exactPath ? '1' : '0',
      readStatus: filters.readStatus == null ? undefined : filters.readStatus ? '1' : '0',
      devices: filters.devices?.join('|'),
    },
  });

  return data;
};

export const getCalibreDbBookPaths = async (
  path: string,
  devices?: string[],
): Promise<Record<string, string>> => {
  const url = 'calibredb/book-paths';
  const { data } = await axiosSecureClient.get<Record<string, string>>(url, {
    params: {
      path,
      devices: devices?.join('|'),
    },
  });

  return data;
};

export const getCalibreDbLookup = async (
  path: string,
  lookupTable: string,
): Promise<Record<string, string>> => {
  const url = 'calibredb/lookup';
  const { data } = await axiosSecureClient.get<Record<string, string>>(url, {
    params: { path, table: lookupTable },
  });
  return data;
};
