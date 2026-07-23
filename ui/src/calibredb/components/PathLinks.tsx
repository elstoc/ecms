import { useNavigate } from 'react-router';

import { Button } from '@/shared/components/button';
import { useTitle } from '@/shared/hooks';

import { useCalibreDb } from '../hooks/useCalibreDb';
import { useBooks } from '../hooks/useCalibreDbQueries';
import { getUniquePaths } from '../utils/getUniquePaths';

import * as styles from './CalibreDb.module.css';

export const PathLinks = () => {
  const { childPaths: paths } = useBooks();
  const navigate = useNavigate();

  const uniquePaths = getUniquePaths(paths);

  const {
    state: {
      mode,
      title,
      apiFilters: { bookPath },
    },
    updateApiFilter,
  } = useCalibreDb();

  const pathBaseName = bookPath?.split('/')?.pop() || '/';

  useTitle(mode === 'search' ? title : `${title}${bookPath ? ' - ' + bookPath : ''}`);

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

  if (mode === 'search') {
    return <></>;
  }

  return (
    <div className={styles.Paths}>
      <h1 className={styles.PathName}>{pathBaseName}</h1>
      {bookPath && (
        <Button className={styles.PathBack} onClick={() => navigate(-1)}>
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
