import { IconButton } from '@/shared/components/icon-button';

import { useCalibreDb } from '../hooks/useCalibreDb';

export const BookTools = () => {
  const {
    state: { apiFilters },
    updateApiFilter,
  } = useCalibreDb();

  return (
    <>
      <IconButton
        icon='sortBook'
        label='sort by title'
        onClick={() => updateApiFilter({ key: 'sortOrder', value: 'title' })}
        color={apiFilters.sortOrder === 'title' ? 'black' : 'grey'}
        isDisabled={apiFilters.sortOrder !== 'title'}
      />
      <IconButton
        icon='sortAuthor'
        label='sort by author'
        onClick={() => updateApiFilter({ key: 'sortOrder', value: 'author' })}
        color={apiFilters.sortOrder === 'author' ? 'black' : 'grey'}
      />
      <IconButton
        icon='shuffle'
        label='shuffle'
        onClick={() => updateApiFilter({ key: 'sortOrder', value: 'shuffle' })}
        color={apiFilters.sortOrder === 'shuffle' ? 'black' : 'grey'}
      />
    </>
  );
};
