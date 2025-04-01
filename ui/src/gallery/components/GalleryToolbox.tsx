import { useContext } from 'react';

import { ComponentToolbox, ToolProps } from '@/site/components/ComponentToolbox';

import { GalleryStateContext } from '../hooks/useGalleryState';

export const GalleryToolbox = () => {
  const {
    galleryState: { sortOrder },
    galleryStateReducer,
  } = useContext(GalleryStateContext);

  const toolProps: ToolProps[] = [
    {
      key: 'shuffle',
      icon: 'shuffle',
      color: sortOrder === 'shuffle' ? 'black' : 'grey',
      onClick: () => galleryStateReducer({ action: 'setSortOrder', value: 'shuffle' }),
    },
    {
      key: 'sortorder',
      icon: sortOrder === 'asc' ? 'sortAsc' : 'sortDesc',
      color: sortOrder === 'shuffle' ? 'grey' : 'black',
      onClick: () =>
        galleryStateReducer({
          action: 'setSortOrder',
          value: sortOrder === 'desc' ? 'asc' : 'desc',
        }),
    },
  ];

  return <ComponentToolbox toolProps={toolProps} />;
};
