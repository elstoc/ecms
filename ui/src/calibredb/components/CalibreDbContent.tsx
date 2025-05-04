import { Suspense } from 'react';

import { Books } from '@/calibredb/components/Books';
import { ContentWithSidebar } from '@/shared/components/layout';

import { BookFilters } from './BookFilters';

import './CalibreDbContent.scss';

export const CalibreDbContent = () => {
  const content = (
    <Suspense>
      <Books />
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
