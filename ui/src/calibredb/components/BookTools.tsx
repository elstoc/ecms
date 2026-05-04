import { IconButton } from '@/shared/components/icon-button';

import { useCalibreDb } from '../hooks/useCalibreDb';

export const BookTools = () => {
  const {
    state: { uiFilters },
    updateUiFilter,
  } = useCalibreDb();

  return (
    <>
      <IconButton
        icon='sortBook'
        label='sort by title'
        onClick={() => updateUiFilter({ key: 'sortOrder', value: 'title' })}
        isDisabled={uiFilters.sortOrder !== 'title'}
      />
      <IconButton
        icon='sortAuthor'
        label='sort by author'
        onClick={() => updateUiFilter({ key: 'sortOrder', value: 'author' })}
        isDisabled={uiFilters.sortOrder !== 'author'}
      />
      <IconButton
        icon='shuffle'
        label='shuffle'
        onClick={() => updateUiFilter({ key: 'sortOrder', value: 'shuffle' })}
        isDisabled={uiFilters.sortOrder !== 'shuffle'}
      />
    </>
  );
};
