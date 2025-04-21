export type Book = {
  id: number;
  title: string;
};

export type PaginatedBooks = {
  books: Book[];
  currentPage: number;
  totalPages: number;
};
