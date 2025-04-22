import { Suspense } from 'react';

import { BookList } from '@/calibredb/components/BookList';
import { ContentWithSidebar } from '@/shared/components/layout';

import { BookFilters } from './BookFilters';

export const CalibreDbContent = () => {
  const content = (
    <Suspense>
      <BookList />
    </Suspense>
  );

  const sidebar = (
    <Suspense>
      <BookFilters />
    </Suspense>
  );

  return (
    <div className='calibre-content'>
      <ContentWithSidebar content={content} sidebar={sidebar} />
    </div>
  );
};
