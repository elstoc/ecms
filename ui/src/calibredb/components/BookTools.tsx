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
        color={uiFilters.sortOrder === 'title' ? 'black' : 'grey'}
        isDisabled={uiFilters.sortOrder !== 'title'}
      />
      <IconButton
        icon='sortAuthor'
        label='sort by author'
        onClick={() => updateUiFilter({ key: 'sortOrder', value: 'author' })}
        color={uiFilters.sortOrder === 'author' ? 'black' : 'grey'}
      />
      <IconButton
        icon='shuffle'
        label='shuffle'
        onClick={() => updateUiFilter({ key: 'sortOrder', value: 'shuffle' })}
        color={uiFilters.sortOrder === 'shuffle' ? 'black' : 'grey'}
      />
    </>
  );
};
