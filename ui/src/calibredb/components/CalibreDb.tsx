import { CalibreDbMetadata } from '@/contracts/site';
import { useTitle } from '@/shared/hooks';
import { ContentWithSidebar } from '@/site/components/ContentWithSidebar';

import { BookFilters } from './BookFilters';
import { BookTools } from './BookTools';
import { Books } from './Books';
import { CalibreDbProvider } from './CalibreDbProvider';

export const CalibreDb = ({ title, apiPath }: CalibreDbMetadata) => {
  useTitle(title);

  return (
    <CalibreDbProvider title={title} apiPath={apiPath}>
      <ContentWithSidebar sidebar={<BookFilters />} componentTools={<BookTools />}>
        <Books />
      </ContentWithSidebar>
    </CalibreDbProvider>
  );
};
