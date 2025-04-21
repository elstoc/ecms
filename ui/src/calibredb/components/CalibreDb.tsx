import { CalibreDbContext, useCalibreDbReducer } from '@/calibredb/hooks/useCalibreDb';
import { CalibreDbMetadata } from '@/contracts/site';
import { useTitle } from '@/shared/hooks';

import { CalibreDbContent } from './CalibreDbContent';

export const CalibreDb = ({ title, apiPath }: CalibreDbMetadata) => {
  const reducerProps = useCalibreDbReducer(apiPath, title);

  useTitle(title);

  return (
    <CalibreDbContext.Provider value={reducerProps}>
      <CalibreDbContent />
    </CalibreDbContext.Provider>
  );
};
