export type Book = {
  id: number;
  title: string;
  authors?: number[];
};

export type PaginatedBooks = {
  books: Book[];
  currentPage: number;
  totalPages: number;
};
