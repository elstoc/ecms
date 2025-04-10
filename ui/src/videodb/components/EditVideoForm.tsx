import { Button, Card, Collapse, ControlGroup } from '@blueprintjs/core';
import { useCallback, useState } from 'react';

import { VideoWithId } from '@/contracts/videodb';
import { IntegerInput, NullableStringInput, StringInput, Switch } from '@/shared/components/forms';

import { useEditVideoReducer } from '../hooks/useEditVideoReducer';

import { NullableSelectLookup } from './NullableSelectLookup';
import { SelectLookup } from './SelectLookup';
import { TagInput } from './TagInput';

import './EditVideoForm.scss';

type EditVideoFormProps = {
  initialVideoState: VideoWithId;
  onSave?: (video: VideoWithId) => Promise<void>;
  onDelete?: (id: number) => Promise<void>;
};

export const EditVideoForm = ({ initialVideoState, onSave, onDelete }: EditVideoFormProps) => {
  const [video, dispatch] = useEditVideoReducer(initialVideoState);
  const [collapseIsOpen, setCollapseIsOpen] = useState(false);

  const saveVideo = useCallback(async () => {
    onSave?.(video);
  }, [onSave, video]);

  const deleteVideo = useCallback(async () => {
    onDelete?.(video.id);
  }, [onDelete, video]);

  return (
    <div className='edit-video-form'>
      <StringInput
        label=''
        className='title'
        inline={true}
        value={video.title}
        onValueChange={(value) => dispatch({ key: 'title', value })}
        autoFocus={true}
      />
      <ControlGroup className='first-group'>
        <SelectLookup
          label='Watched'
          className='watched-status'
          selectedKey={video.watched}
          lookupTable='watched_status'
          onSelectionChange={(value) => dispatch({ key: 'watched', value })}
        />
        <SelectLookup
          label='Category'
          className='category'
          lookupTable='categories'
          selectedKey={video.category}
          onSelectionChange={(value) => dispatch({ key: 'category', value })}
        />
      </ControlGroup>
      <ControlGroup className='second-group'>
        <IntegerInput
          label='Episodes'
          className='num-episodes'
          value={video.num_episodes ?? undefined}
          onValueChange={(value) => dispatch({ key: 'num_episodes', value: value ?? null })}
        />
        <IntegerInput
          label='Length'
          className='length'
          value={video.length_mins ?? undefined}
          onValueChange={(value) => dispatch({ key: 'length_mins', value: value ?? null })}
        />
      </ControlGroup>
      <Card className='media'>
        <ControlGroup>
          <NullableSelectLookup
            label='Media'
            className='media-type'
            lookupTable='media_types'
            selectedKey={video.primary_media_type}
            onSelectionChange={(value) => dispatch({ key: 'primary_media_type', value })}
          />
          <NullableSelectLookup
            label='Location'
            className='media-location'
            lookupTable='media_locations'
            selectedKey={video.primary_media_location}
            onSelectionChange={(value) => dispatch({ key: 'primary_media_location', value })}
          />
          <NullableSelectLookup
            label='Watched'
            className='watched-status'
            lookupTable='watched_status'
            selectedKey={video.primary_media_watched}
            onSelectionChange={(value) => dispatch({ key: 'primary_media_watched', value })}
          />
        </ControlGroup>
        <ControlGroup>
          <NullableSelectLookup
            label=''
            className='media-type'
            lookupTable='media_types'
            selectedKey={video.other_media_type}
            onSelectionChange={(value) => dispatch({ key: 'other_media_type', value })}
          />
          <NullableSelectLookup
            label=''
            className='media-location'
            lookupTable='media_locations'
            selectedKey={video.other_media_location}
            onSelectionChange={(value) => dispatch({ key: 'other_media_location', value })}
          />
        </ControlGroup>
        <NullableStringInput
          label='Notes'
          className='notes'
          value={video.media_notes}
          onValueChange={(value) => dispatch({ key: 'media_notes', value })}
        />
      </Card>
      <Switch
        label='Flag'
        className='priority-flag'
        inline={true}
        value={(video.priority_flag ?? 0) > 0}
        onValueChange={(value) => dispatch({ key: 'priority_flag', value: value ? 1 : 0 })}
      />
      <TagInput
        label='Tags'
        inline={true}
        tags={video.tags}
        onSelectionChange={(value) => dispatch({ key: 'tags', value })}
      />
      <NullableStringInput
        label='Progress'
        className='progress'
        inline={true}
        value={video.progress}
        onValueChange={(value) => dispatch({ key: 'progress', value })}
      />
      <Button
        className='collapser'
        onClick={() => setCollapseIsOpen((open) => !open)}
        icon={collapseIsOpen ? 'caret-up' : 'caret-down'}
      />
      <Collapse isOpen={collapseIsOpen}>
        <NullableStringInput
          label='Director'
          className='director'
          inline={true}
          value={video.director}
          onValueChange={(value) => dispatch({ key: 'director', value })}
        />
        <NullableStringInput
          label='Actors'
          inline={true}
          value={video.actors}
          onValueChange={(value) => dispatch({ key: 'actors', value })}
        />
        <NullableStringInput
          label='Plot'
          inline={true}
          value={video.plot}
          onValueChange={(value) => dispatch({ key: 'plot', value })}
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
