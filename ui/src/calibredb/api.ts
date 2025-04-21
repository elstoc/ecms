import { PaginatedBooks } from '@/contracts/calibredb';
import { axiosSecureClient } from '@/shared/api';

export const getCalibreDbBooks = async (path: string, pages: number): Promise<PaginatedBooks> => {
  const url = 'calibredb/books';
  const { data } = await axiosSecureClient.get<PaginatedBooks>(url, {
    params: { path, pages: pages.toString() },
  });

  return data;
};
