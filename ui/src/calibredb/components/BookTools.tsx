import { IconButton } from '@/shared/components/icon-button';

import { useCalibreDb } from '../hooks/useCalibreDb';

export const BookTools = () => {
  const { state, updateFilter } = useCalibreDb();

  return (
    <>
      <IconButton
        icon='sortBook'
        label='sort by title'
        onClick={() => updateFilter({ key: 'sortOrder', value: 'title' })}
        color={state.sortOrder === 'title' ? 'black' : 'grey'}
        isDisabled={state.sortOrder !== 'title'}
      />
      <IconButton
        icon='sortAuthor'
        label='sort by author'
        onClick={() => updateFilter({ key: 'sortOrder', value: 'author' })}
        color={state.sortOrder === 'author' ? 'black' : 'grey'}
      />
      <IconButton
        icon='shuffle'
        label='shuffle'
        onClick={() => updateFilter({ key: 'sortOrder', value: 'shuffle' })}
        color={state.sortOrder === 'shuffle' ? 'black' : 'grey'}
      />
    </>
  );
};
