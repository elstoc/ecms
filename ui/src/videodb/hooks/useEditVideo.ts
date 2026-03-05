import { useReducer } from 'react';

import { Video } from '@/contracts/videodb';
import { KeyValueOfType } from '@/utils';

type VideoReducerActions =
  | { type: 'updateField'; payload: KeyValueOfType<Video> }
  | { type: 'reset'; payload: Video };

type VideoAndInitialTitle = {
  video: Video;
  initialTitle: string;
};

const videoReducer: (
  state: VideoAndInitialTitle,
  action: VideoReducerActions,
) => VideoAndInitialTitle = (state, action) => {
  if (action.type === 'updateField') {
    if (action.payload.key === 'primary_media_watched' && action.payload.value === 'Y') {
      return {
        ...state,
        video: {
          ...state.video,
          primary_media_watched: 'Y',
          watched: 'Y',
        },
      };
    }
    return { ...state, video: { ...state.video, [action.payload.key]: action.payload.value } };
  }
  if (action.type === 'reset') {
    return {
      initialTitle: action.payload.title,
      video: action.payload,
    };
  }
  return state;
};

const useEditVideoReducer = (initialState: VideoAndInitialTitle) =>
  useReducer(videoReducer, initialState);

export const useEditVideo = (initialState: Video) => {
  const [editVideoState, dispatch] = useEditVideoReducer({
    video: initialState,
    initialTitle: initialState.title,
  });

  const updateField = (keyValue: KeyValueOfType<Video>) =>
    dispatch({ type: 'updateField', payload: keyValue });

  const resetVideo = (video: Video) => dispatch({ type: 'reset', payload: video });

  return {
    editVideoState,
    updateField,
    resetVideo,
  };
};
