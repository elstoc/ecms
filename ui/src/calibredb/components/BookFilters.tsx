import { Button } from '@blueprintjs/core';

import { Switch } from '@/shared/components/forms';
import { SuggestItem } from '@/shared/components/forms/SuggestItem';
import { toIntOrUndefined } from '@/utils';

import { useAllPaths } from '../hooks/useAllPaths';
import { useCalibreDb } from '../hooks/useCalibreDb';

import { SelectLookup } from './SelectLookup';

import './BookFilters.scss';

export const BookFilters = () => {
  const allPaths = useAllPaths();
  const {
    state: { uiFilters },
    updateUiFilter,
    dispatch,
  } = useCalibreDb();

  return (
    <div className='book-filters'>
      <div className='filter-title'>Books</div>
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
        value={!!uiFilters.exactPath}
        onChange={(value) => updateUiFilter({ key: 'exactPath', value })}
      />
      <div className='filter-action-buttons'>
        <Button onClick={() => dispatch({ type: 'resetFilters' })}>Reset Filters</Button>
      </div>
    </div>
  );
};
