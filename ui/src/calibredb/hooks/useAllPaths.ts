import { useMemo } from 'react';

import { useBookPaths } from './useCalibreDbQueries';

export const useAllPaths = () => {
  const paths = useBookPaths();

  const allPaths = useMemo(() => {
    const bookPaths = Object.values(paths).map((v) => v);

    const pathList = bookPaths.reduce((acc, path) => {
      let buildPath = '';
      const pathPortions = path.split('/');
      pathPortions.forEach((portion) => {
        if (buildPath) buildPath += '/';
        buildPath += portion;
        if (!acc.includes(buildPath)) {
          acc.push(buildPath);
        }
      });
      return acc;
    }, [] as string[]);

    return pathList.sort();
  }, [paths]);

  return allPaths;
};
