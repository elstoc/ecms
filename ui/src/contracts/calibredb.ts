export type Book = {
  id: number;
  title: string;
  description?: string;
  authors?: number[];
  rating?: number;
  format?: number;
  path?: number;
  collections?: number[];
  koboStatus?: number;
  kindleStatus?: number;
  tabletStatus?: number;
  read?: boolean;
  fixed?: boolean;
};

export type PaginatedBooks = {
  books: Book[];
  currentPage: number;
  totalPages: number;
};
