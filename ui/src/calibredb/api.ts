import { axiosSecureClient } from '@/shared/api';

export type Book = {
  title: string;
};

type PaginatedBooks = {
  books: Book[];
};

export const getCalibreDbBooks = async (path: string): Promise<PaginatedBooks> => {
  const url = 'calibredb/books';
  const { data } = await axiosSecureClient.get<PaginatedBooks>(url, { params: { path } });

  return data;
};
