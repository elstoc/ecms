import { useEffect } from 'react';

import { Video } from '@/contracts/videodb';
import { Button } from '@/shared/components/button';
import { Card } from '@/shared/components/card';
import { Input } from '@/shared/components/input';
import { NumberInput } from '@/shared/components/number-input';
import { Switch } from '@/shared/components/switch';

import { useEditVideo } from '../hooks/useEditVideo';

import { SelectLookup } from './SelectLookup';
import { VideoTagInput } from './VideoTagInput';

import './EditVideoForm.scss';

type EditVideoFormProps = {
  initialVideo: Video;
  onSave?: (video: Video) => Promise<void>;
  onDelete?: () => Promise<void>;
};

export const EditVideoForm = ({ initialVideo, onSave, onDelete }: EditVideoFormProps) => {
  const {
    editVideoState: { initialTitle, video: videoState },
    updateField,
    resetVideo,
  } = useEditVideo(initialVideo);

  useEffect(() => {
    if (initialTitle !== initialVideo.title) {
      resetVideo(initialVideo);
    }
  }, [initialTitle, initialVideo, resetVideo]);

  return (
    <div className='edit-video-form'>
      <Input
        label='Title'
        value={videoState.title}
        onChange={(value) => updateField({ key: 'title', value: value ?? '' })}
        autoFocus={true}
        width='full'
      />
      <div className='watched-and-category'>
        <SelectLookup
          label='Watched'
          value={videoState.watched}
          lookupTable='watched_status'
          onChange={(value) => updateField({ key: 'watched', value: value || '' })}
          width='sm'
        />
        <SelectLookup
          label='Category'
          lookupTable='categories'
          value={videoState.category}
          onChange={(value) => updateField({ key: 'category', value: value || '' })}
        />
      </div>
      <div className='episodes-and-length'>
        <NumberInput
          label='Episodes'
          value={videoState.num_episodes ?? null}
          onChange={(value) => updateField({ key: 'num_episodes', value: value ?? undefined })}
          maximumFractionDigits={0}
          width='sm'
        />
        <NumberInput
          label='Length'
          value={videoState.length_mins ?? null}
          onChange={(value) => updateField({ key: 'length_mins', value: value ?? undefined })}
          maximumFractionDigits={0}
          width='sm'
        />
      </div>
      <Card className='media'>
        <div className='media-block'>
          <SelectLookup
            label='Media'
            lookupTable='media_types'
            value={videoState.primary_media_type ?? null}
            onChange={(value) =>
              updateField({ key: 'primary_media_type', value: value ?? undefined })
            }
            valueForNullCode='—'
          />
          <SelectLookup
            label='Location'
            lookupTable='media_locations'
            value={videoState.primary_media_location ?? null}
            onChange={(value) =>
              updateField({ key: 'primary_media_location', value: value ?? undefined })
            }
            valueForNullCode='—'
          />
          <SelectLookup
            label='Watched'
            lookupTable='watched_status'
            value={videoState.primary_media_watched ?? null}
            onChange={(value) =>
              updateField({ key: 'primary_media_watched', value: value ?? undefined })
            }
            valueForNullCode='—'
            width='sm'
          />
        </div>
        <div className='media-block'>
          <SelectLookup
            label='Second Media'
            lookupTable='media_types'
            value={videoState.other_media_type ?? null}
            onChange={(value) =>
              updateField({ key: 'other_media_type', value: value ?? undefined })
            }
            valueForNullCode='—'
          />
          <SelectLookup
            label='Second Location'
            lookupTable='media_locations'
            value={videoState.other_media_location ?? null}
            onChange={(value) =>
              updateField({ key: 'other_media_location', value: value ?? undefined })
            }
            valueForNullCode='—'
          />
        </div>
        <Input
          label='Notes'
          value={videoState.media_notes ?? ''}
          onChange={(value) => updateField({ key: 'media_notes', value: value || undefined })}
          width='full'
        />
      </Card>
      <Switch
        label='Flag'
        checked={(videoState.priority_flag ?? 0) > 0}
        onChange={(value) => updateField({ key: 'priority_flag', value: value ? 1 : 0 })}
      />
      <VideoTagInput
        label='Tags'
        selectedTags={videoState.tags ?? undefined}
        onChange={(value) => updateField({ key: 'tags', value })}
        width='full'
        allowCreation
      />
      <Input
        label='Progress'
        value={videoState.progress ?? ''}
        onChange={(value) => updateField({ key: 'progress', value: value || undefined })}
        width='full'
      />
      <div className='form-buttons'>
        {onDelete && (
          <Button tabIndex={-1} className='delete-button' onClick={() => onDelete?.()}>
            Delete Video
          </Button>
        )}
        {onSave && (
          <Button className='save-button' onClick={() => onSave?.(videoState)}>
            Save Changes
          </Button>
        )}
      </div>
    </div>
  );
};
