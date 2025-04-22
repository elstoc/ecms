/* eslint-disable react/display-name */
import { Card } from '@blueprintjs/core';
import { forwardRef } from 'react';

import { Book } from '@/contracts/calibredb';

import { useLookup, useLookupValue } from '../hooks/useCalibreDbQueries';

type BookListItemProps = {
  book: Book;
};

export const BookListItem = forwardRef<HTMLDivElement, BookListItemProps>(({ book }, ref) => {
  const authors = useLookup('authors');
  const format = useLookupValue('formats', book.format);
  const shelfPath = useLookupValue('shelfPaths', book.shelfPath);

  return (
    <Card ref={ref}>
      <div>{book.title}</div>
      <div>{book.authors?.map((id) => authors[id]).join(', ')}</div>
      <div>{format}</div>
      <div>{shelfPath}</div>
    </Card>
  );
});
