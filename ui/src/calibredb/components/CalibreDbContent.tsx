import { Suspense } from 'react';

import { BookList } from '@/calibredb/components/BookList';
import { ContentWithSidebar } from '@/shared/components/layout';

import { useBooks } from '../hooks/useCalibreDbQueries';

export const CalibreDbContent = () => {
  const books = useBooks();

  const content = (
    <Suspense>
      <BookList books={books.books} />
    </Suspense>
  );

  const sidebar = (
    <Suspense>
      <div>Sidebar placeholder</div>
    </Suspense>
  );

  return (
    <div className='calibre-content'>
      <ContentWithSidebar content={content} sidebar={sidebar} />
    </div>
  );
};
