import { Button } from '@blueprintjs/core';

import { toIntOrUndefined } from '@/utils';

import { useCalibreDb } from '../hooks/useCalibreDb';

import { SelectLookup } from './SelectLookup';

import './BookFilters.scss';

export const BookFilters = () => {
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
      <div className='filter-action-buttons'>
        <Button onClick={() => dispatch({ type: 'resetFilters' })}>Reset Filters</Button>
      </div>
    </div>
  );
};
