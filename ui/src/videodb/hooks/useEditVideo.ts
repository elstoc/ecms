import { useReducer } from 'react';

import { Video } from '@/contracts/videodb';
import { KeyValueOfType } from '@/utils';

type VideoReducerActions =
  | { type: 'updateField'; payload: KeyValueOfType<Video> }
  | { type: 'reset'; payload: Video };

const videoReducer: (state: Video, action: VideoReducerActions) => Video = (state, action) => {
  if (action.type === 'updateField') {
    if (action.payload.key === 'primary_media_watched' && action.payload.value === 'Y') {
      return {
        ...state,
        primary_media_watched: 'Y',
        watched: 'Y',
      };
    }
    return { ...state, [action.payload.key]: action.payload.value };
  }
  return state;
};

const useEditVideoReducer = (initialState: Video) => useReducer(videoReducer, initialState);

export const useEditVideo = (initialState: Video) => {
  const [state, dispatch] = useEditVideoReducer(initialState);

  const updateField = (keyValue: KeyValueOfType<Video>) =>
    dispatch({ type: 'updateField', payload: keyValue });

  const resetVideo = (video: Video) => dispatch({ type: 'reset', payload: video });

  return {
    state,
    updateField,
    resetVideo,
  };
};
