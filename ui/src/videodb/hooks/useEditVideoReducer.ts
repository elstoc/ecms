import { useReducer } from 'react';

import { Video } from '@/contracts/videodb';
import { KeyValueOfType } from '@/utils';

const videoReducer: (state: Video, action: KeyValueOfType<Video>) => Video = (state, action) => {
  return { ...state, [action.key]: action.value };
};

export const useEditVideoReducer = (initialState: Video) => useReducer(videoReducer, initialState);
