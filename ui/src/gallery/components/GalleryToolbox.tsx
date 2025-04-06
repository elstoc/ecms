import { useContext } from 'react';

import { Icon } from '@/shared/components/icon';
import { Toolbox } from '@/shared/components/layout';

import { GalleryStateContext } from '../hooks/useGalleryState';

export const GalleryToolbox = () => {
  const {
    galleryState: { sortOrder },
    galleryStateReducer,
  } = useContext(GalleryStateContext);

  return (
    <Toolbox>
      <Icon
        name={sortOrder === 'asc' ? 'sortAsc' : 'sortDesc'}
        color={sortOrder === 'shuffle' ? 'grey' : 'black'}
        onClick={() =>
          galleryStateReducer({
            action: 'setSortOrder',
            value: sortOrder === 'desc' ? 'asc' : 'desc',
          })
        }
      />
      <Icon
        name='shuffle'
        color={sortOrder === 'shuffle' ? 'black' : 'grey'}
        onClick={() => galleryStateReducer({ action: 'setSortOrder', value: 'shuffle' })}
      />
    </Toolbox>
  );
};
