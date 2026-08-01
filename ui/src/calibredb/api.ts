import { PaginatedBooks } from '@/contracts/calibredb';
import { axiosSecureClient } from '@/shared/api';

export const getCalibreDbBooks = async (
  params: Record<string, string | number | undefined>,
): Promise<PaginatedBooks> => {
  const url = 'calibredb/books';
  const { data } = await axiosSecureClient.get<PaginatedBooks>(url, { params });

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
