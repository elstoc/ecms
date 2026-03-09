import { useOnInView } from 'react-intersection-observer';

import { useCalibreDb } from '../hooks/useCalibreDb';
import { useBooks } from '../hooks/useCalibreDbQueries';

import { BookListItem } from './BookListItem';

import './BookList.css';

export const BookList = () => {
  const { dispatch } = useCalibreDb();
  const { books, currentPage, totalPages } = useBooks();

  const refLastBook = useOnInView((inView) => {
    if (inView) {
      dispatch({ type: 'setPages', payload: Math.min(totalPages, currentPage + 1) });
    }
  });

  return (
    <div className='book-list'>
      {books.map((book, index) => {
        const lastBook = index === books.length - 1;
        return <BookListItem key={book.id} book={book} ref={lastBook ? refLastBook : null} />;
      })}
    </div>
  );
};
