import { useReducer } from 'react';

import { Video, VideoWithId } from '@/contracts/videodb';
import { KeyValueOfType } from '@/utils';

const videoReducer: (state: VideoWithId, action: KeyValueOfType<Video>) => VideoWithId = (
  state,
  action,
) => {
  return { ...state, [action.key]: action.value };
};

export const useEditVideoReducer = (initialState: VideoWithId) =>
  useReducer(videoReducer, initialState);
