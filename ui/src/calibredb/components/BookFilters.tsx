import { Button } from '@blueprintjs/core';

import { SegmentedControlInput, Switch } from '@/shared/components/forms';
import { SuggestItem } from '@/shared/components/forms/SuggestItem';
import { toIntOrUndefined } from '@/utils';

import { useAllPaths } from '../hooks/useAllPaths';
import { useCalibreDb } from '../hooks/useCalibreDb';

import { SelectLookup } from './SelectLookup';

import './BookFilters.scss';

const modeOptions = [
  { code: 'browse', description: 'Browse' },
  { code: 'search', description: 'Search' },
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
    <div className='book-filters'>
      <div className='filter-title'>Books</div>
      <SegmentedControlInput
        label='Mode'
        inline={true}
        describedCodes={modeOptions}
        selectedCode={mode}
        onChange={() => dispatch({ type: 'toggleMode' })}
      />
      <SegmentedControlInput
        label='Sort'
        inline={true}
        describedCodes={sortOrderOptions}
        selectedCode={uiFilters.sortOrder}
        onChange={(value) => updateUiFilter({ key: 'sortOrder', value: value ?? 'title' })}
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
      <Switch
        label='Exact path'
        className='exact-path'
        inline={true}
        disabled={mode === 'browse'}
        value={!!uiFilters.exactPath}
        onChange={(value) => updateUiFilter({ key: 'exactPath', value })}
      />
      <div className='filter-action-buttons'>
        <Button onClick={() => dispatch({ type: 'resetFilters' })}>Reset Filters</Button>
      </div>
    </div>
  );
};
