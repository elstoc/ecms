import {
  Input,
  IntegerInput,
  SegmentedControlInput,
  Switch,
} from '@/shared/components-legacy/forms';
import { Button } from '@/shared/components/button';

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
        disabled={showOnlyExpandedIds}
        selectedCode={uiFilters.categories}
        onChange={(value) => updateUiFilter({ key: 'categories', value })}
        filterable={false}
      />
      <SegmentedControlInput
        label='Min Resolution'
        inline={true}
        disabled={showOnlyExpandedIds}
        describedCodes={minResolutionOptions}
        selectedCode={uiFilters.minResolution}
        onChange={(value) => updateUiFilter({ key: 'minResolution', value })}
      />
      <SegmentedControlInput
        label='Watched'
        inline={true}
        disabled={showOnlyExpandedIds}
        describedCodes={watchedStatusOptions}
        selectedCode={uiFilters.watched}
        onChange={(value) => updateUiFilter({ key: 'watched', value })}
      />
      <SegmentedControlInput
        label='Media Watched'
        inline={true}
        disabled={showOnlyExpandedIds}
        describedCodes={watchedStatusOptions}
        selectedCode={uiFilters.mediaWatched}
        onChange={(value) => updateUiFilter({ key: 'mediaWatched', value })}
      />
      <IntegerInput
        label='Max Length'
        className='max-length'
        inline={true}
        disabled={showOnlyExpandedIds}
        value={uiFilters.maxLength}
        onChange={(value) => updateUiFilter({ key: 'maxLength', value }, 1000)}
      />
      <VideoTagInput
        label='Tags'
        className='tags'
        selectedTags={uiFilters.tags}
        allowCreation={false}
        disabled={showOnlyExpandedIds}
        onChange={(value) => updateUiFilter({ key: 'tags', value })}
      />
      <Input
        label='Title Search'
        inline={true}
        disabled={showOnlyExpandedIds}
        value={uiFilters.titleContains}
        onChange={(value) => updateUiFilter({ key: 'titleContains', value }, 1000)}
      />
      <SelectLookup
        label='Primary Media'
        className='primary-media'
        lookupTable='media_types'
        allowUndefinedCodeSelection={true}
        valueForUndefinedCode='All'
        inline={true}
        disabled={showOnlyExpandedIds}
        selectedCode={uiFilters.primaryMediaType}
        onChange={(value) => updateUiFilter({ key: 'primaryMediaType', value })}
        filterable={false}
      />
      <div className='switches'>
        <Switch
          label='In progress'
          className='has-progress-notes'
          inline={true}
          disabled={showOnlyExpandedIds}
          value={!!uiFilters.hasProgressNotes}
          onChange={(value) => updateUiFilter({ key: 'hasProgressNotes', value })}
        />
        <Switch
          label='Flagged'
          className='flagged'
          inline={true}
          disabled={showOnlyExpandedIds}
          value={!!uiFilters.flaggedOnly}
          onChange={(value) => updateUiFilter({ key: 'flaggedOnly', value })}
        />
      </div>
      <div className='filter-action-buttons'>
        <Button
          isDisabled={expandedVideoIds.length === 0}
          onPress={() => dispatch({ type: 'resetVideoExpanded' })}
        >
          Collapse all
        </Button>
        <Button
          isDisabled={expandedVideoIds.length === 0}
          onPress={() => dispatch({ type: 'toggleShowOnlyExpanded' })}
        >
          {showOnlyExpandedIds ? 'Reapply filters' : 'Show expanded'}
        </Button>
        <Button onPress={() => dispatch({ type: 'resetFilters' })}>Reset Filters</Button>
      </div>
    </div>
  );
};
