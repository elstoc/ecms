import { useReducer } from 'react';

import { Video } from '@/contracts/videodb';
import { KeyValueOfType } from '@/utils';

const videoReducer: (state: Video, action: KeyValueOfType<Video>) => Video = (state, action) => {
  if (action.key === 'primary_media_watched' && action.value === 'Y') {
    return {
      ...state,
      primary_media_watched: 'Y',
      watched: 'Y',
    };
  }
  return { ...state, [action.key]: action.value };
};

export const useEditVideoReducer = (initialState: Video) => useReducer(videoReducer, initialState);
