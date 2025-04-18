import { Button } from '@blueprintjs/core';

import { Input, IntegerInput, SegmentedControlInput, Switch } from '@/shared/components/forms';

import { useVideoDb } from '../hooks/useVideoDb';

import { SelectLookup } from './SelectLookup';
import { VideoTagInput } from './VideoTagInput';

import './VideoFilters.scss';

const minResolutionOptions = [
  { code: undefined, description: 'SD' },
  { code: 'HD', description: 'HD' },
  { code: 'UHD', description: 'UHD' },
];

const watchedStatusOptions = [
  { code: undefined, description: 'All' },
  { code: 'Y', description: 'Y' },
  { code: 'N', description: 'N' },
];

export const VideoFilters = () => {
  const {
    state: { uiFilters, showOnlyExpandedIds, expandedVideoIds },
    dispatch,
    updateUiFilter,
  } = useVideoDb();

  return (
    <div className='video-filters'>
      <div className='filter-title'>Videos</div>
      <SelectLookup
        label='Category'
        className='category'
        lookupTable='categories'
        allowUndefinedCodeSelection={true}
        valueForUndefinedCode='All'
        inline={true}
        selectedCode={uiFilters.categories}
        onChange={(value) => updateUiFilter({ key: 'categories', value })}
        filterable={false}
      />
      <SegmentedControlInput
        label='Min Resolution'
        inline={true}
        describedCodes={minResolutionOptions}
        selectedCode={uiFilters.minResolution}
        onChange={(value) => updateUiFilter({ key: 'minResolution', value })}
      />
      <SegmentedControlInput
        label='Watched'
        inline={true}
        describedCodes={watchedStatusOptions}
        selectedCode={uiFilters.watched}
        onChange={(value) => updateUiFilter({ key: 'watched', value })}
      />
      <SegmentedControlInput
        label='Media Watched'
        inline={true}
        describedCodes={watchedStatusOptions}
        selectedCode={uiFilters.mediaWatched}
        onChange={(value) => updateUiFilter({ key: 'mediaWatched', value })}
      />
      <IntegerInput
        label='Max Length'
        className='max-length'
        inline={true}
        value={uiFilters.maxLength}
        onChange={(value) => updateUiFilter({ key: 'maxLength', value }, 1000)}
      />
      <VideoTagInput
        label='Tags'
        className='tags'
        selectedTags={uiFilters.tags}
        allowCreation={false}
        onChange={(value) => updateUiFilter({ key: 'tags', value })}
      />
      <Input
        label='Title Search'
        inline={true}
        value={uiFilters.titleContains}
        onChange={(value) => updateUiFilter({ key: 'titleContains', value }, 1000)}
      />
      <Switch
        label='Flagged'
        className='flagged'
        inline={true}
        value={!!uiFilters.flaggedOnly}
        onChange={(value) => updateUiFilter({ key: 'flaggedOnly', value })}
      />
      <div className='filter-action-buttons'>
        <Button
          disabled={expandedVideoIds.length === 0}
          onClick={() => dispatch({ type: 'resetVideoExpanded' })}
        >
          Collapse all
        </Button>
        <Button
          disabled={expandedVideoIds.length === 0}
          onClick={() => dispatch({ type: 'toggleShowOnlyExpanded' })}
        >
          {showOnlyExpandedIds ? 'Reapply filters' : 'Show expanded'}
        </Button>
        <Button onClick={() => dispatch({ type: 'resetFilters' })}>Reset Filters</Button>
      </div>
    </div>
  );
};
