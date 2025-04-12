import { Button } from '@blueprintjs/core';

import { Input, IntegerInput, SegmentedControlInput, Switch } from '@/shared/components/forms';

import { useVideoDb } from '../hooks/useVideoDb';

import { VideoSelectLookup } from './VideoSelectLookup';
import { VideoTagInput } from './VideoTagInput';

import './VideoFilters.scss';

const minResolutionOptions = [
  { key: undefined, value: 'SD' },
  { key: 'HD', value: 'HD' },
  { key: 'UHD', value: 'UHD' },
];

const watchedStatusOptions = [
  { key: undefined, value: 'All' },
  { key: 'Y', value: 'Y' },
  { key: 'N', value: 'N' },
];

export const VideoFilters = () => {
  const {
    state: { uiFilters },
    dispatch,
    updateUiFilter,
  } = useVideoDb();

  return (
    <div className='video-filters'>
      <div className='filter-title'>Videos</div>
      <VideoSelectLookup
        label='Category'
        className='category'
        lookupTable='categories'
        allowUndefinedKeySelection={true}
        valueForUndefinedKey='All'
        inline={true}
        selectedKey={uiFilters.categories ?? undefined}
        onSelectionChange={(value) => updateUiFilter({ key: 'categories', value })}
        filterable={false}
      />
      <SegmentedControlInput
        label='Min Resolution'
        inline={true}
        options={minResolutionOptions}
        selectedKey={uiFilters.minResolution}
        onChange={(value) => updateUiFilter({ key: 'minResolution', value })}
      />
      <SegmentedControlInput
        label='Watched'
        inline={true}
        options={watchedStatusOptions}
        selectedKey={uiFilters.watched}
        onChange={(value) => updateUiFilter({ key: 'watched', value })}
      />
      <SegmentedControlInput
        label='Media Watched'
        inline={true}
        options={watchedStatusOptions}
        selectedKey={uiFilters.mediaWatched}
        onChange={(value) => updateUiFilter({ key: 'mediaWatched', value })}
      />
      <IntegerInput
        label='Max Length'
        className='max-length'
        inline={true}
        value={uiFilters.maxLength}
        onValueChange={(value) => updateUiFilter({ key: 'maxLength', value }, 1000)}
      />
      <VideoTagInput
        label='Tags'
        className='tags'
        tags={uiFilters.tags}
        allowCreation={false}
        onSelectionChange={(value) => updateUiFilter({ key: 'tags', value })}
      />
      <Input
        label='Title Search'
        inline={true}
        value={uiFilters.titleContains ?? undefined}
        onValueChange={(value) => updateUiFilter({ key: 'titleContains', value }, 1000)}
      />
      <Switch
        label='Flagged'
        className='flagged'
        inline={true}
        value={uiFilters.flaggedOnly === 1}
        onValueChange={(value) => updateUiFilter({ key: 'flaggedOnly', value: value ? 1 : 0 })}
      />
      <div className='filter-action-buttons'>
        <Button onClick={() => dispatch({ type: 'resetFilters' })}>Reset Filters</Button>
      </div>
    </div>
  );
};
