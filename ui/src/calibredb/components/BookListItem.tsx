import { forwardRef, useState } from 'react';

import { Book } from '@/contracts/calibredb';
import { BookCard } from '@/shared/components/book-card/BookCard';
import { config } from '@/utils';

import { useCalibreDb } from '../hooks/useCalibreDb';
import { useLookup, useLookupValue } from '../hooks/useCalibreDbQueries';

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

  const devices = [];
  if (koboStatus) devices.push('kobo');
  if (kindleStatus) devices.push('kindle');
  if (tabletStatus) devices.push('tablet');

  return (
    <BookCard
      ref={ref}
      expanded={expanded}
      onExpandedChange={(value: boolean) => setExpanded(value)}
      title={book.title}
      authors={book.authors?.map((id) => authors[id]).join(', ') ?? ''}
      format={format}
      read={book.read}
      rating={book.rating}
      devices={devices}
      path={path}
      description={book.description}
      coverUrl={`${config.apiUrl}/calibredb/cover?${urlParams.toString()}`}
    />
  );
});
