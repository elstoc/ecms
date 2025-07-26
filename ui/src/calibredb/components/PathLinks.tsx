import { Button } from '@/shared/components/button';

import { useAllPaths } from '../hooks/useAllPaths';
import { useCalibreDb } from '../hooks/useCalibreDb';

import './PathLinks.css';

export const PathLinks = () => {
  const paths = useAllPaths();

  const {
    state: {
      mode,
      uiFilters: { bookPath },
    },
    updateUiFilter,
  } = useCalibreDb();

  if (mode === 'search') {
    return <></>;
  }

  const childPaths = paths.filter((path) => {
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

  return (
    <div className='path-links'>
      {bookPath && (
        <Button
          onPress={() => {
            const newPath = bookPath.includes('/')
              ? bookPath.substring(0, bookPath.lastIndexOf('/'))
              : undefined;
            updateUiFilter({
              key: 'bookPath',
              value: newPath,
            });
          }}
        >
          ..
        </Button>
      )}
      {childPaths.map((childPath) => (
        <Button
          key={childPath}
          onPress={() =>
            updateUiFilter({
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
