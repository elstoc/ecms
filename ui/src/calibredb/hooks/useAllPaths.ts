import { useMemo } from 'react';

import { getUniquePaths } from '../utils/getUniquePaths';

import { useBookPaths } from './useCalibreDbQueries';

export const useAllPaths = () => {
  const paths = useBookPaths();

  const allPaths = useMemo(() => {
    return getUniquePaths(paths);
  }, [paths]);

  return allPaths;
};
