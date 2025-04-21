import { PaginatedBooks } from '@/contracts/calibredb';
import { axiosSecureClient } from '@/shared/api';

export const getCalibreDbBooks = async (path: string, pages: number): Promise<PaginatedBooks> => {
  const url = 'calibredb/books';
  const { data } = await axiosSecureClient.get<PaginatedBooks>(url, {
    params: { path, pages: pages.toString() },
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
