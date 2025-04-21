/* eslint-disable react/display-name */
import { Card } from '@blueprintjs/core';
import { forwardRef } from 'react';

import { Book } from '@/contracts/calibredb';

type BookListItemProps = {
  book: Book;
};

export const BookListItem = forwardRef<HTMLDivElement, BookListItemProps>(({ book }, ref) => {
  return <Card ref={ref}>{book.title}</Card>;
});
