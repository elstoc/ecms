import { Button } from '@blueprintjs/core';

import {
  NullableIntInput,
  NullableStringInput,
  SegmentedControlInput,
  Switch,
} from '@/shared/components/forms';

import { useVideoDbFilterState } from '../hooks/useVideoDbFilterState';

import { NullableSelectLookup } from './NullableSelectLookup';
import { TagInput } from './TagInput';

import './VideoFilters.scss';

const minResolutionOptions = [
  { label: 'SD', value: '' },
  { label: 'HD', value: 'HD' },
  { label: 'UHD', value: 'UHD' },
];

const watchedStatusOptions = [
  { label: 'All', value: '' },
  { label: 'Y', value: 'Y' },
  { label: 'N', value: 'N' },
];

export const VideoFilters = () => {
  const { state, updateState, clearAllFilters } = useVideoDbFilterState();

  return (
    <div className='video-filters'>
      <div className='filter-title'>Videos</div>
      <NullableSelectLookup
        label='Category'
        className='category'
        lookupTable='categories'
        inline={true}
        selectedKey={state.categories}
        onSelectionChange={(value) =>
          updateState({ action: 'setFilter', key: 'categories', value })
        }
        nullValueRepr='All'
        filterable={false}
      />
      <SegmentedControlInput
        label='Min Resolution'
        inline={true}
        options={minResolutionOptions}
        value={state.minResolution || ''}
        onValueChange={(value) => updateState({ action: 'setFilter', key: 'minResolution', value })}
      />
      <SegmentedControlInput
        label='Watched'
        inline={true}
        options={watchedStatusOptions}
        value={state.watched ?? ''}
        onValueChange={(value) => updateState({ action: 'setFilter', key: 'watched', value })}
      />
      <SegmentedControlInput
        label='Media Watched'
        inline={true}
        options={watchedStatusOptions}
        value={state.mediaWatched ?? ''}
        onValueChange={(value) => updateState({ action: 'setFilter', key: 'mediaWatched', value })}
      />
      <NullableIntInput
        label='Max Length'
        className='max-length'
        inline={true}
        value={state.maxLength}
        onValueChange={(value) => updateState({ action: 'setFilter', key: 'maxLength', value })}
      />
      <TagInput
        label='Tags'
        className='tags'
        inline={true}
        tags={state.tags}
        allowCreation={false}
        onSelectionChange={(value) => updateState({ action: 'setFilter', key: 'tags', value })}
      />
      <NullableStringInput
        label='Title Search'
        inline={true}
        value={state.titleContains}
        placeholder=''
        onValueChange={(value) => updateState({ action: 'setFilter', key: 'titleContains', value })}
      />
      <Switch
        label='Flagged'
        className='flagged'
        inline={true}
        value={state.flaggedOnly === 1}
        onValueChange={(value) =>
          updateState({
            action: 'setFilter',
            key: 'flaggedOnly',
            value: value ? 1 : 0,
          })
        }
      />
      <div className='filter-action-buttons'>
        <Button onClick={clearAllFilters}>Reset Filters</Button>
      </div>
    </div>
  );
};
