import { Button } from '@/shared/components/button';
import { Input } from '@/shared/components/input';
import { NumberInput } from '@/shared/components/number-input';
import { Switch } from '@/shared/components/switch';
import { ToggleGroup } from '@/shared/components/toggle-group';

import { useVideoDb } from '../hooks/useVideoDb';

import { SelectLookup } from './SelectLookup';
import { VideoTagInput } from './VideoTagInput';

import './VideoFilters.scss';

const minResolutionItems = [
  { value: 'SD', label: 'SD' },
  { value: 'HD', label: 'HD' },
  { value: 'UHD', label: 'UHD' },
];

const watchedStatusItems = [
  { value: 'All', label: 'All' },
  { value: 'Y', label: 'Y' },
  { value: 'N', label: 'N' },
];

export const VideoFilters = () => {
  const {
    state: { uiFilters, showOnlyExpandedIds, expandedVideoIds },
    dispatch,
    updateUiFilter,
  } = useVideoDb();

  return (
    <div className='video-filters'>
      <div className='row between'>
        <SelectLookup
          label='Category'
          lookupTable='categories'
          valueForNullCode='All'
          disabled={showOnlyExpandedIds}
          value={uiFilters.categories ?? null}
          onChange={(value) => updateUiFilter({ key: 'categories', value: value ?? undefined })}
        />
        <ToggleGroup
          label='Min Resolution'
          disabled={showOnlyExpandedIds}
          items={minResolutionItems}
          value={[uiFilters.minResolution ?? 'SD']}
          onChange={(value) =>
            updateUiFilter({
              key: 'minResolution',
              value: value[0] === 'SD' ? undefined : value[0],
            })
          }
        />
      </div>
      <Input
        label='Title Search'
        disabled={showOnlyExpandedIds}
        value={uiFilters.titleContains ?? ''}
        onChange={(value) =>
          updateUiFilter({ key: 'titleContains', value: value || undefined }, 1000)
        }
        width='full'
      />
      <VideoTagInput
        label='Tags'
        selectedTags={uiFilters.tags}
        allowCreation={false}
        disabled={showOnlyExpandedIds}
        onChange={(value) =>
          updateUiFilter({ key: 'tags', value: value?.length ? value : undefined })
        }
        width='full'
      />
      <div className='row between'>
        <div className='col'>
          <NumberInput
            label='Min Length'
            value={uiFilters.minLength ?? null}
            onChange={(value) =>
              updateUiFilter({ key: 'minLength', value: value ?? undefined }, 1000)
            }
            maximumFractionDigits={0}
            disabled={showOnlyExpandedIds}
          />
          <NumberInput
            label='Max Length'
            value={uiFilters.maxLength ?? null}
            onChange={(value) =>
              updateUiFilter({ key: 'maxLength', value: value ?? undefined }, 1000)
            }
            maximumFractionDigits={0}
            disabled={showOnlyExpandedIds}
          />
        </div>
        <div className='col'>
          <ToggleGroup
            label='Watched'
            disabled={showOnlyExpandedIds}
            items={watchedStatusItems}
            value={[uiFilters.watched ?? 'All']}
            onChange={(value) =>
              updateUiFilter({ key: 'watched', value: value[0] === 'All' ? undefined : value[0] })
            }
          />
          <ToggleGroup
            label='Media'
            disabled={showOnlyExpandedIds}
            items={watchedStatusItems}
            value={[uiFilters.mediaWatched ?? 'All']}
            onChange={(value) =>
              updateUiFilter({
                key: 'mediaWatched',
                value: value[0] === 'All' ? undefined : value[0],
              })
            }
          />
        </div>
      </div>
      <SelectLookup
        label='Primary Media'
        lookupTable='media_types'
        valueForNullCode='All'
        disabled={showOnlyExpandedIds}
        value={uiFilters.primaryMediaType ?? null}
        onChange={(value) => updateUiFilter({ key: 'primaryMediaType', value: value ?? undefined })}
        width='full'
      />
      <div className='switches'>
        <Switch
          label='In progress'
          disabled={showOnlyExpandedIds}
          checked={!!uiFilters.hasProgressNotes}
          onChange={(value) => updateUiFilter({ key: 'hasProgressNotes', value })}
        />
        <Switch
          label='Flagged'
          disabled={showOnlyExpandedIds}
          checked={!!uiFilters.flaggedOnly}
          onChange={(value) => updateUiFilter({ key: 'flaggedOnly', value })}
        />
      </div>
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
