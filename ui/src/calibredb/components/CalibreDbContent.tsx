import { Suspense } from 'react';

import { Books } from '@/calibredb/components/Books';
import { ContentWithSidebar } from '@/site/components/ContentWithSidebar';

import { BookFilters } from './BookFilters';

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

  return <ContentWithSidebar content={content} sidebar={sidebar} />;
};
