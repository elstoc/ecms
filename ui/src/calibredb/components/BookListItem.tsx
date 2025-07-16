import { Collapse, Divider, Tag } from '@blueprintjs/core';
import { forwardRef, useState } from 'react';

import { Book } from '@/contracts/calibredb';
import { Card } from '@/shared/components/card';
import { Icon } from '@/shared/components/icon';
import { config } from '@/utils';

import { useCalibreDb } from '../hooks/useCalibreDb';
import { useLookup, useLookupValue } from '../hooks/useCalibreDbQueries';

import './BookListItem.scss';

type BookListItemProps = {
  book: Book;
};

export const BookListItem = forwardRef<HTMLDivElement, BookListItemProps>(({ book }, ref) => {
  const {
    state: { apiPath },
  } = useCalibreDb();

  const [expanded, setExpanded] = useState(false);
  const authors = useLookup('authors');
  const format = useLookupValue('formats', book.format);
  const path = useLookupValue('paths', book.path);
  const koboStatus = useLookupValue('koboStatuses', book.koboStatus);
  const kindleStatus = useLookupValue('kindleStatuses', book.kindleStatus);
  const tabletStatus = useLookupValue('tabletStatuses', book.tabletStatus);

  const urlParams = new URLSearchParams({ path: apiPath, id: book.id.toString() });

  return (
    <Card
      ref={ref}
      className='book-list-item'
      highlight={expanded}
      onClick={() => setExpanded((curr) => !curr)}
    >
      <div className='primary-info'>
        <div>
          <div className='title'>{book.title}</div>
          <div>{book.authors?.map((id) => authors[id]).join(', ')}</div>
        </div>
        <div className='right'>
          <div className='format'>{format}</div>
          {book.read && <Icon className='read-icon' name='check' />}
        </div>
      </div>
      <Collapse isOpen={expanded}>
        <div className='secondary-info'>
          <div className='tags'>
            {koboStatus && <Tag>kobo</Tag>}
            {kindleStatus && <Tag>kindle</Tag>}
            {tabletStatus && <Tag>tablet</Tag>}
            {book.rating && ' * '.repeat(book.rating)}
          </div>
          <div className='book-path'>{path}</div>
          <Divider className='description-divider' />
          <div className='cover-desc'>
            <img
              className='cover'
              alt=''
              src={`${config.apiUrl}/calibredb/cover?${urlParams.toString()}`}
            />
            {book.description && <div dangerouslySetInnerHTML={{ __html: book.description }} />}
          </div>
        </div>
      </Collapse>
    </Card>
  );
});
