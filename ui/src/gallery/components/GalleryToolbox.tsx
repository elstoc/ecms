import { Icon } from '@/shared/components/icon';
import { Toolbox } from '@/shared/components/layout';

import { useGallery } from '../hooks/useGallery';

export const GalleryToolbox = () => {
  const {
    state: { sortOrder },
    dispatch,
  } = useGallery();

  return (
    <Toolbox>
      <Icon
        label={sortOrder === 'asc' ? 'click to sort descending' : 'click to sort ascending'}
        name={sortOrder === 'asc' ? 'sortAsc' : 'sortDesc'}
        color={sortOrder === 'shuffle' ? 'grey' : 'black'}
        onClick={() =>
          dispatch({
            type: 'setSortOrder',
            payload: sortOrder === 'desc' ? 'asc' : 'desc',
          })
        }
      />
      <Icon
        label={sortOrder === 'shuffle' ? 'click to re-shuffle' : 'click to shuffle'}
        name='shuffle'
        color={sortOrder === 'shuffle' ? 'black' : 'grey'}
        onClick={() => dispatch({ type: 'setSortOrder', payload: 'shuffle' })}
      />
    </Toolbox>
  );
};
