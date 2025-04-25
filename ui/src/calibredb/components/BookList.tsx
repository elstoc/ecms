import { Card } from '@blueprintjs/core';
import { startTransition, useRef } from 'react';

import { useElementIsVisible } from '@/shared/hooks';

import { useCalibreDb } from '../hooks/useCalibreDb';
import { useBooks } from '../hooks/useCalibreDbQueries';

import { BookListItem } from './BookListItem';

import './BookList.scss';

export const BookList = () => {
  const { dispatch } = useCalibreDb();
  const { books, currentPage, totalPages } = useBooks();
  const refLastBook = useRef<HTMLDivElement>(null);

  useElementIsVisible(refLastBook, () => {
    startTransition(() => {
      dispatch({ type: 'setPages', payload: Math.min(totalPages, currentPage + 1) });
    });
  });

  return (
    <Card className='book-list'>
      {books.map((book, index) => {
        const lastBook = index === books.length - 1;
        return <BookListItem key={book.id} book={book} ref={lastBook ? refLastBook : null} />;
      })}
    </Card>
  );
};
