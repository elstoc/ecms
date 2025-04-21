import { Card } from '@blueprintjs/core';

import { Book } from '../api';

type BookListItemProps = {
  book: Book;
};

export const BookListItem = ({ book }: BookListItemProps) => {
  return <Card key={book.title}>{book.title}</Card>;
};
