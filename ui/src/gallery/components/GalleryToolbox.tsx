import { IconButton } from '@/shared/components/icon-button';
import { Toolbox } from '@/shared/components/layout';

import { useGallery } from '../hooks/useGallery';

export const GalleryToolbox = () => {
  const {
    state: { sortOrder },
    dispatch,
  } = useGallery();

  return (
    <Toolbox>
      <IconButton
        label={sortOrder === 'asc' ? 'click to sort descending' : 'click to sort ascending'}
        icon={sortOrder === 'asc' ? 'sortAsc' : 'sortDesc'}
        color={sortOrder === 'shuffle' ? 'grey' : 'black'}
        onClick={() =>
          dispatch({
            type: 'setSortOrder',
            payload: sortOrder === 'desc' ? 'asc' : 'desc',
          })
        }
      />
      <IconButton
        label={sortOrder === 'shuffle' ? 'click to re-shuffle' : 'click to shuffle'}
        icon='shuffle'
        color={sortOrder === 'shuffle' ? 'black' : 'grey'}
        onClick={() => dispatch({ type: 'setSortOrder', payload: 'shuffle' })}
      />
    </Toolbox>
  );
};
