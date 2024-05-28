import React, { FC, ReactElement, useReducer } from 'react';

import { useVideoDbLookup, useVideoDbVideo } from '../hooks/useVideoDbQueries';
import { videoReducer } from '../hooks/useVideoReducer';
import { OptionalIntInput, OptionalStringInput, SelectKeyValue, StringInput } from '../../common/components/forms';
import { Button } from '@blueprintjs/core';

export const EditVideo: FC<{ apiPath: string, id: number }> = ({ apiPath, id }): ReactElement => {
    const video = useVideoDbVideo(apiPath, id);
    const categoryLookup = useVideoDbLookup(apiPath, 'categories');
    const watchedStatusLookup = useVideoDbLookup(apiPath, 'watched_status');
    const [state, stateReducer] = useReducer(videoReducer, video);
    return (
        <div>
            <StringInput
                label='Title'
                value={state.title}
                onValueChange={(value) => stateReducer({ key: 'title', value })}
            />
            <SelectKeyValue
                label='Category'
                allItems={categoryLookup}
                selectedKey={state.category}
                onSelectionChange={(value) => stateReducer({ key: 'category', value})}
            />
            <SelectKeyValue
                label='Watched'
                allItems={watchedStatusLookup}
                selectedKey={state.watched}
                onSelectionChange={(value) => stateReducer({ key: 'watched', value})}
            />
            <OptionalStringInput
                label='Director'
                value={state.director}
                onValueChange={(value) => stateReducer({ key: 'director', value })}
            />
            <OptionalIntInput
                label='Length (mins)'
                value={state.length_mins}
                onValueChange={(value) => stateReducer({ key: 'length_mins', value})}
            />
            <Button onClick={() => console.log(JSON.stringify(state))}>
                Click Me
            </Button>
        </div>
    );
};
