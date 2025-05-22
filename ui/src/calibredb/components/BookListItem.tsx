/* eslint-disable react/display-name */
import { Card, Collapse, Divider } from '@blueprintjs/core';
import { forwardRef, useState } from 'react';

import { Book } from '@/contracts/calibredb';

import { useLookup, useLookupValue } from '../hooks/useCalibreDbQueries';

import './BookListItem.scss';

type BookListItemProps = {
  book: Book;
};

export const BookListItem = forwardRef<HTMLDivElement, BookListItemProps>(({ book }, ref) => {
  const [expanded, setExpanded] = useState(false);
  const authors = useLookup('authors');
  const collections = useLookup('collections');
  const format = useLookupValue('formats', book.format);
  const path = useLookupValue('paths', book.path);
  const koboStatus = useLookupValue('koboStatuses', book.koboStatus);
  const kindleStatus = useLookupValue('kindleStatuses', book.kindleStatus);
  const tabletStatus = useLookupValue('tabletStatuses', book.tabletStatus);

  return (
    <Card
      ref={ref}
      className={`book-list-item ${expanded ? 'expanded' : ''}`}
      onClick={() => setExpanded((curr) => !curr)}
    >
      <div className='primary-info'>
        <div>
          <div className='title'>{book.title}</div>
          <div>{book.authors?.map((id) => authors[id]).join(', ')}</div>
        </div>
        <div className='format'>{format}</div>
      </div>
      <Collapse isOpen={expanded}>
        <div className='secondary-info'>
          <Divider />
          <div>Rating (quality): {book.rating}</div>
          <div>Path: {path}</div>
          <div>Collections: {book.collections?.map((id) => collections[id]).join(', ')}</div>
          <div>Kobo Status: {koboStatus}</div>
          <div>Kindle Status: {kindleStatus}</div>
          <div>Tablet Status: {tabletStatus}</div>
          <div>Read: {book.read ? 'Yes' : 'No'}</div>
          <div>Fixed: {book.fixed ? 'Yes' : 'No'}</div>
          {book.description && (
            <>
              <Divider />
              <div dangerouslySetInnerHTML={{ __html: book.description }} />
            </>
          )}
        </div>
      </Collapse>
    </Card>
  );
});
