import { Books } from '@/calibredb/components/Books';
import { ContentWithSidebar } from '@/site/components/ContentWithSidebar';
import { Layout } from '@/site/components/Layout';

import { BookFilters } from './BookFilters';

export const CalibreDbContent = () => (
  <Layout>
    <ContentWithSidebar content={<Books />} sidebar={<BookFilters />} />
  </Layout>
);
