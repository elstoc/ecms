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
        name={sortOrder === 'asc' ? 'sortAsc' : 'sortDesc'}
        color={sortOrder === 'shuffle' ? 'grey' : 'black'}
        onClick={() =>
          dispatch({
            type: 'setSortOrder',
            value: sortOrder === 'desc' ? 'asc' : 'desc',
          })
        }
      />
      <Icon
        name='shuffle'
        color={sortOrder === 'shuffle' ? 'black' : 'grey'}
        onClick={() => dispatch({ type: 'setSortOrder', value: 'shuffle' })}
      />
    </Toolbox>
  );
};
