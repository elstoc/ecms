export type Book = {
  title: string;
};

export type PaginatedBooks = {
  books: Book[];
  currentPage: number;
  totalPages: number;
};
