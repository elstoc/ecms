import { Button } from '@/shared/components/button';
import { useKeyPress } from '@/shared/hooks';

import { useCalibreDb } from '../hooks/useCalibreDb';
import { useBooks } from '../hooks/useCalibreDbQueries';
import { getUniquePaths } from '../utils/getUniquePaths';

import * as styles from './CalibreDb.module.css';

export const PathLinks = () => {
  const { childPaths: paths } = useBooks();

  const uniquePaths = getUniquePaths(paths);

  const {
    state: {
      mode,
      apiFilters: { bookPath },
    },
    updateApiFilter,
  } = useCalibreDb();

  const childPaths =
    mode === 'search'
      ? []
      : uniquePaths.filter((path) => {
          if (bookPath && !path.startsWith(`${bookPath}/`)) {
            return false;
          }
          if (bookPath) {
            const basePath = path.substring(bookPath.length + 1);
            return basePath !== '' && !basePath.includes('/');
          } else {
            return !path.includes('/');
          }
        });

  const goPrevious = () => {
    if (bookPath) {
      const newPath = bookPath.includes('/')
        ? bookPath.substring(0, bookPath.lastIndexOf('/'))
        : undefined;
      updateApiFilter({
        key: 'bookPath',
        value: newPath,
      });
    }
  };

  // do not activate backspace listener at root of path tree or in search mode
  const deactivateListener = Boolean(mode === 'search' || !bookPath);

  useKeyPress(['Backspace'], () => goPrevious(), deactivateListener);

  if (mode === 'search') {
    return <></>;
  }

  const pathBaseName = bookPath?.split('/')?.pop() || '/';

  return (
    <div className={styles.Paths}>
      <h1 className={styles.PathName}>{pathBaseName}</h1>
      {bookPath && (
        <Button className={styles.PathBack} onClick={goPrevious}>
          . .
        </Button>
      )}
      {childPaths.map((childPath) => (
        <Button
          key={childPath}
          onClick={() =>
            updateApiFilter({
              key: 'bookPath',
              value: childPath,
            })
          }
        >
          {childPath.substring(childPath.lastIndexOf('/') + 1)}
        </Button>
      ))}
    </div>
  );
};
