import { toIntOrUndefined } from '@/utils';

import { useCalibreDb } from '../hooks/useCalibreDb';

import { SelectLookup } from './SelectLookup';

import './BookFilters.scss';

export const BookFilters = () => {
  const {
    state: { uiFilters },
    updateUiFilter,
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
    </div>
  );
};
