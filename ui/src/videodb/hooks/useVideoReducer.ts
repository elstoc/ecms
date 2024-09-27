import { VideoWithId } from '../api';

type SetStringField = {
    key: 'title' | 'category' | 'director' | 'watched' | 'progress' | 'imdb_id' | 'image_url' | 'actors' | 'plot' | 'tags'
       | 'primary_media_type' | 'primary_media_location' | 'primary_media_watched' | 'other_media_type' | 'other_media_location' | 'media_notes';
    value: string | null;
};

type SetNumericField = {
    key: 'length_mins' | 'to_watch_priority' | 'year';
    value: number | null;
};

type SetFieldActions = SetStringField | SetNumericField;

export const videoReducer: (state: VideoWithId, action: SetFieldActions) => VideoWithId = (state, action) => {
    return { ...state, [action.key]: action.value };
};
