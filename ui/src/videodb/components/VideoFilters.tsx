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
  const { filterState, updateFilterState, clearAllFilters } = useVideoDbFilterState();

  return (
    <div className='video-filters'>
      <div className='filter-title'>Videos</div>
      <NullableSelectLookup
        label='Category'
        className='category'
        lookupTable='categories'
        inline={true}
        selectedKey={filterState.categories}
        onSelectionChange={(value) =>
          updateFilterState({ type: 'setFilter', key: 'categories', value })
        }
        nullValueRepr='All'
        filterable={false}
      />
      <SegmentedControlInput
        label='Min Resolution'
        inline={true}
        options={minResolutionOptions}
        value={filterState.minResolution || ''}
        onValueChange={(value) =>
          updateFilterState({ type: 'setFilter', key: 'minResolution', value })
        }
      />
      <SegmentedControlInput
        label='Watched'
        inline={true}
        options={watchedStatusOptions}
        value={filterState.watched ?? ''}
        onValueChange={(value) => updateFilterState({ type: 'setFilter', key: 'watched', value })}
      />
      <SegmentedControlInput
        label='Media Watched'
        inline={true}
        options={watchedStatusOptions}
        value={filterState.mediaWatched ?? ''}
        onValueChange={(value) =>
          updateFilterState({ type: 'setFilter', key: 'mediaWatched', value })
        }
      />
      <NullableIntInput
        label='Max Length'
        className='max-length'
        inline={true}
        value={filterState.maxLength}
        onValueChange={(value) => updateFilterState({ type: 'setFilter', key: 'maxLength', value })}
      />
      <TagInput
        label='Tags'
        className='tags'
        inline={true}
        tags={filterState.tags}
        allowCreation={false}
        onSelectionChange={(value) => updateFilterState({ type: 'setFilter', key: 'tags', value })}
      />
      <NullableStringInput
        label='Title Search'
        inline={true}
        value={filterState.titleContains}
        placeholder=''
        onValueChange={(value) =>
          updateFilterState({ type: 'setFilter', key: 'titleContains', value })
        }
      />
      <Switch
        label='Flagged'
        className='flagged'
        inline={true}
        value={filterState.flaggedOnly === 1}
        onValueChange={(value) =>
          updateFilterState({
            type: 'setFilter',
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
