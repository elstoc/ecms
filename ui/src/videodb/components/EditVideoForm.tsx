import { Button, Card, Collapse, ControlGroup } from '@blueprintjs/core';
import { useCallback, useState } from 'react';

import { Video, VideoWithId } from '@/contracts/videodb';
import { Input, IntegerInput, Switch } from '@/shared/components/forms';

import { useEditVideoReducer } from '../hooks/useEditVideoReducer';

import { SelectVideoDbLookup } from './SelectVideoDbLookup';
import { VideoTagInput } from './VideoTagInput';

import './EditVideoForm.scss';

type EditVideoFormProps = {
  initialVideoState: VideoWithId;
  onSave?: (video: Video) => Promise<void>;
  onDelete?: () => Promise<void>;
};

export const EditVideoForm = ({ initialVideoState, onSave, onDelete }: EditVideoFormProps) => {
  const [video, dispatch] = useEditVideoReducer(initialVideoState);
  const [collapseIsOpen, setCollapseIsOpen] = useState(false);

  const saveVideo = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...videoWithoutId } = video;
    onSave?.(videoWithoutId);
  }, [onSave, video]);

  const deleteVideo = useCallback(async () => {
    onDelete?.();
  }, [onDelete, video]);

  return (
    <div className='edit-video-form'>
      <Input
        label=''
        className='title'
        inline={true}
        value={video.title}
        onChange={(value) => dispatch({ key: 'title', value: value ?? '' })}
        autoFocus={true}
      />
      <ControlGroup className='first-group'>
        <SelectVideoDbLookup
          label='Watched'
          className='watched-status'
          selectedCode={video.watched}
          lookupTable='watched_status'
          onSelectionChange={(value) => dispatch({ key: 'watched', value: value || '' })}
        />
        <SelectVideoDbLookup
          label='Category'
          className='category'
          lookupTable='categories'
          selectedCode={video.category}
          onSelectionChange={(value) => dispatch({ key: 'category', value: value || '' })}
        />
      </ControlGroup>
      <ControlGroup className='second-group'>
        <IntegerInput
          label='Episodes'
          className='num-episodes'
          value={video.num_episodes ?? undefined}
          onChange={(value) => dispatch({ key: 'num_episodes', value })}
        />
        <IntegerInput
          label='Length'
          className='length'
          value={video.length_mins ?? undefined}
          onChange={(value) => dispatch({ key: 'length_mins', value })}
        />
      </ControlGroup>
      <Card className='media'>
        <ControlGroup>
          <SelectVideoDbLookup
            label='Media'
            className='media-type'
            lookupTable='media_types'
            allowUndefinedCodeSelection={true}
            selectedCode={video.primary_media_type ?? undefined}
            onSelectionChange={(value) => dispatch({ key: 'primary_media_type', value })}
          />
          <SelectVideoDbLookup
            label='Location'
            className='media-location'
            lookupTable='media_locations'
            allowUndefinedCodeSelection={true}
            selectedCode={video.primary_media_location ?? undefined}
            onSelectionChange={(value) => dispatch({ key: 'primary_media_location', value })}
          />
          <SelectVideoDbLookup
            label='Watched'
            className='watched-status'
            lookupTable='watched_status'
            allowUndefinedCodeSelection={true}
            selectedCode={video.primary_media_watched ?? undefined}
            onSelectionChange={(value) => dispatch({ key: 'primary_media_watched', value })}
          />
        </ControlGroup>
        <ControlGroup>
          <SelectVideoDbLookup
            label=''
            className='media-type'
            lookupTable='media_types'
            allowUndefinedCodeSelection={true}
            selectedCode={video.other_media_type ?? undefined}
            onSelectionChange={(value) => dispatch({ key: 'other_media_type', value })}
          />
          <SelectVideoDbLookup
            label=''
            className='media-location'
            lookupTable='media_locations'
            allowUndefinedCodeSelection={true}
            selectedCode={video.other_media_location ?? undefined}
            onSelectionChange={(value) => dispatch({ key: 'other_media_location', value })}
          />
        </ControlGroup>
        <Input
          label='Notes'
          className='notes'
          value={video.media_notes ?? undefined}
          onChange={(value) => dispatch({ key: 'media_notes', value })}
        />
      </Card>
      <Switch
        label='Flag'
        className='priority-flag'
        inline={true}
        value={(video.priority_flag ?? 0) > 0}
        onChange={(value) => dispatch({ key: 'priority_flag', value: value ? 1 : 0 })}
      />
      <VideoTagInput
        label='Tags'
        selectedTags={video.tags ?? undefined}
        onChange={(value) => dispatch({ key: 'tags', value })}
      />
      <Input
        label='Progress'
        className='progress'
        inline={true}
        value={video.progress ?? undefined}
        onChange={(value) => dispatch({ key: 'progress', value })}
      />
      <Button
        className='collapser'
        onClick={() => setCollapseIsOpen((open) => !open)}
        icon={collapseIsOpen ? 'caret-up' : 'caret-down'}
      />
      <Collapse isOpen={collapseIsOpen}>
        <Input
          label='Director'
          className='director'
          inline={true}
          value={video.director ?? undefined}
          onChange={(value) => dispatch({ key: 'director', value })}
        />
        <Input
          label='Actors'
          inline={true}
          value={video.actors ?? undefined}
          onChange={(value) => dispatch({ key: 'actors', value })}
        />
        <Input
          label='Plot'
          inline={true}
          value={video.plot ?? undefined}
          onChange={(value) => dispatch({ key: 'plot', value })}
        />
      </Collapse>
      <div className='form-buttons'>
        {onDelete && (
          <Button tabIndex={-1} className='delete-button' onClick={deleteVideo}>
            Delete Video
          </Button>
        )}
        {onSave && (
          <Button className='save-button' onClick={saveVideo}>
            Save Changes
          </Button>
        )}
      </div>
    </div>
  );
};
