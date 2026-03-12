import { CalibreDbContext, useCalibreDbReducer } from '@/calibredb/hooks/useCalibreDb';
import { CalibreDbMetadata } from '@/contracts/site';
import { useTitle } from '@/shared/hooks';
import { ContentWithSidebar } from '@/site/components/ContentWithSidebar';

import { BookFilters } from './BookFilters';
import { Books } from './Books';

export const CalibreDb = ({ title, apiPath }: CalibreDbMetadata) => {
  const reducerProps = useCalibreDbReducer(apiPath, title);

  useTitle(title);

  return (
    <CalibreDbContext.Provider value={reducerProps}>
      <ContentWithSidebar sidebar={<BookFilters />}>
        <Books />
      </ContentWithSidebar>
    </CalibreDbContext.Provider>
  );
};
