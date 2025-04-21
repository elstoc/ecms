import { BookListItem } from '@/calibredb/components/BookListItem';

import { Book } from '../api';

type BookListProps = {
  books: Book[];
};

export const BookList = ({ books }: BookListProps) => {
  return books.map((book) => <BookListItem key={book.title} book={book} />);
};
