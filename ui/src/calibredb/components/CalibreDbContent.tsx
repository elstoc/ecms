import { Books } from '@/calibredb/components/Books';
import { ContentWithSidebar } from '@/site/components/ContentWithSidebar';

import { BookFilters } from './BookFilters';

export const CalibreDbContent = () => (
  <ContentWithSidebar sidebar={<BookFilters />}>
    <Books />
  </ContentWithSidebar>
);
