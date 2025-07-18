import { Button } from '@/shared/components/button';
import { Input, MultiTagInput, SegmentedControlInput, Switch } from '@/shared/components/forms';
import { SuggestItem } from '@/shared/components/forms/SuggestItem';
import { toIntOrUndefined } from '@/utils';

import { useAllPaths } from '../hooks/useAllPaths';
import { useCalibreDb } from '../hooks/useCalibreDb';

import { SelectLookup } from './SelectLookup';

import './BookFilters.scss';

const modeOptions = [
  { code: 'search', description: 'Search' },
  { code: 'browse', description: 'Browse' },
];

const readStatusOptions = [
  { code: undefined, description: 'All' },
  { code: 'Y', description: 'Y' },
  { code: 'N', description: 'N' },
];

const sortOrderOptions = [
  { code: 'title', description: 'Title' },
  { code: 'author', description: 'Author' },
  { code: 'shuffle', description: 'Shuffle' },
];

export const BookFilters = () => {
  const allPaths = useAllPaths();
  const {
    state: { uiFilters, mode },
    updateUiFilter,
    dispatch,
  } = useCalibreDb();

  let readStatusCode: 'Y' | 'N' | undefined;
  if (uiFilters.readStatus != null) {
    readStatusCode = uiFilters.readStatus ? 'Y' : 'N';
  }

  return (
    <form role='search' aria-labelledby='book-search-title' className='book-filters'>
      <div id='book-search-title' className='filter-title'>
        Books
      </div>
      <SegmentedControlInput
        label='Mode'
        inline={true}
        describedCodes={modeOptions}
        selectedCode={mode}
        onChange={() => dispatch({ type: 'toggleMode' })}
      />
      <MultiTagInput
        label='Devices'
        selectableTags={['kobo', 'tablet', 'kindle', 'physical']}
        selectedTags={uiFilters.devices}
        onChange={(value) => updateUiFilter({ key: 'devices', value })}
      />
      <SuggestItem
        label='Path'
        className='path'
        items={allPaths}
        allowUndefined={true}
        displayUndefinedAs='All'
        inline={true}
        value={uiFilters.bookPath}
        onChange={(value) => updateUiFilter({ key: 'bookPath', value })}
      />
      {mode === 'search' && (
        <>
          <Switch
            label='Exact path'
            className='exact-path'
            inline={true}
            value={!!uiFilters.exactPath}
            onChange={(value) => updateUiFilter({ key: 'exactPath', value })}
          />
          <Input
            label='Title Search'
            inline={true}
            value={uiFilters.titleContains}
            onChange={(value) => updateUiFilter({ key: 'titleContains', value }, 1000)}
          />
          <SelectLookup
            label='Author'
            className='author'
            lookupTable='authors'
            allowUndefinedCodeSelection={true}
            valueForUndefinedCode='All'
            inline={true}
            selectedCode={uiFilters.author?.toString()}
            onChange={(value) => updateUiFilter({ key: 'author', value: toIntOrUndefined(value) })}
            filterable={true}
          />
          <SelectLookup
            label='Format'
            className='format'
            lookupTable='formats'
            allowUndefinedCodeSelection={true}
            valueForUndefinedCode='All'
            inline={true}
            selectedCode={uiFilters.format?.toString()}
            onChange={(value) => updateUiFilter({ key: 'format', value: toIntOrUndefined(value) })}
            filterable={true}
          />
          <SegmentedControlInput
            label='Read'
            inline={true}
            describedCodes={readStatusOptions}
            selectedCode={readStatusCode}
            onChange={(value) =>
              updateUiFilter({ key: 'readStatus', value: value ? value === 'Y' : undefined })
            }
          />
        </>
      )}
      <SegmentedControlInput
        label='Sort'
        inline={true}
        describedCodes={sortOrderOptions}
        selectedCode={uiFilters.sortOrder}
        onChange={(value) => updateUiFilter({ key: 'sortOrder', value: value ?? 'title' })}
      />
      <div className='filter-action-buttons'>
        <Button type='button' onClick={() => dispatch({ type: 'resetFilters' })}>
          Reset Filters
        </Button>
      </div>
    </form>
  );
};
