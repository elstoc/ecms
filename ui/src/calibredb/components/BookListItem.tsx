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
  const collections = useLookup('collections');
  const format = useLookupValue('formats', book.format);
  const path = useLookupValue('paths', book.path);
  const koboStatus = useLookupValue('koboStatuses', book.koboStatus);
  const kindleStatus = useLookupValue('kindleStatuses', book.kindleStatus);
  const tabletStatus = useLookupValue('tabletStatuses', book.tabletStatus);

  return (
    <Card ref={ref}>
      <div>{book.title}</div>
      <div>Authors: {book.authors?.map((id) => authors[id]).join(', ')}</div>
      <div>Rating (quality): {book.rating}</div>
      <div>Format: {format}</div>
      <div>Path: {path}</div>
      <div>Collections: {book.collections?.map((id) => collections[id]).join(', ')}</div>
      <div>Kobo Status: {koboStatus}</div>
      <div>Kindle Status: {kindleStatus}</div>
      <div>Tablet Status: {tabletStatus}</div>
      <div>Read: {book.read ? 'Yes' : 'No'}</div>
      <div>Fixed: {book.fixed ? 'Yes' : 'No'}</div>
    </Card>
  );
});
