import { Suspense } from 'react';

import { BookList } from '@/calibredb/components/BookList';
import { ContentWithSidebar } from '@/shared/components/layout';

export const CalibreDbContent = () => {
  const content = (
    <Suspense>
      <BookList />
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
