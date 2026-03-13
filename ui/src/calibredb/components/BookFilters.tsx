import { useMemo } from 'react';

import { Button } from '@/shared/components/button';
import { Combobox } from '@/shared/components/combobox';
import { Input } from '@/shared/components/input';
import { TagSelect } from '@/shared/components/tag-select';
import { ToggleGroup } from '@/shared/components/toggle-group';
import { toIntOrUndefined } from '@/utils';

import { useAllPaths } from '../hooks/useAllPaths';
import { useCalibreDb } from '../hooks/useCalibreDb';
import { useLookup } from '../hooks/useCalibreDbQueries';

import { SelectLookup } from './SelectLookup';

import * as styles from './CalibreDb.module.css';

const modeOptionItems = [
  { value: 'browse', label: 'Browse' },
  { value: 'search', label: 'Search' },
];

const readStatusOptionItems = [
  { value: 'All', label: 'All' },
  { value: 'Y', label: 'Y' },
  { value: 'N', label: 'N' },
];

const sortOrderOptionItems = [
  { value: 'title', label: 'Title' },
  { value: 'author', label: 'Author' },
  { value: 'shuffle', label: 'Shuffle' },
];

export const BookFilters = () => {
  const allPaths = useAllPaths();
  const allAuthorsLookup = useLookup('authors');

  const allPathItems = useMemo(
    () => allPaths.map((path) => ({ value: path, label: path })),
    [allPaths],
  );

  const allAuthorItems = useMemo(
    () => Object.entries(allAuthorsLookup).map(([value, label]) => ({ value, label })),
    [allAuthorsLookup],
  );

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
    <form role='search' aria-labelledby='book-search-title' className={styles.Filters}>
      <Input
        label='Title Search'
        value={uiFilters.titleContains ?? ''}
        onChange={(value) =>
          updateUiFilter({ key: 'titleContains', value: value || undefined }, 1000)
        }
        width='full'
      />
      <ToggleGroup
        label='Mode'
        items={modeOptionItems}
        value={[mode]}
        onChange={() => dispatch({ type: 'toggleMode' })}
      />
      <TagSelect
        label='Devices'
        selectableTags={['kobo', 'tablet', 'kindle', 'physical']}
        selectedTags={uiFilters.devices ?? []}
        onChange={(value) =>
          updateUiFilter({ key: 'devices', value: value.length ? value : undefined })
        }
        emptyMessage='No devices found'
        width='full'
      />
      <Combobox
        label='Path'
        items={allPathItems}
        emptyMessage='No paths found'
        value={uiFilters.bookPath ?? null}
        onChange={(value) => updateUiFilter({ key: 'bookPath', value: value ?? undefined })}
        maxListItems={100}
        width='full'
      />
      {mode === 'search' && (
        <>
          <Combobox
            label='Author'
            items={allAuthorItems}
            value={uiFilters.author?.toString() ?? null}
            onChange={(value) => updateUiFilter({ key: 'author', value: toIntOrUndefined(value) })}
            emptyMessage='No authors found'
            maxListItems={100}
            width='full'
          />
          <SelectLookup
            label='Format'
            lookupTable='formats'
            valueForNullCode='All'
            value={uiFilters.format?.toString() ?? null}
            onChange={(value) => updateUiFilter({ key: 'format', value: toIntOrUndefined(value) })}
          />
          <ToggleGroup
            label='Read'
            items={readStatusOptionItems}
            value={[readStatusCode ?? 'All']}
            onChange={(value) =>
              updateUiFilter({
                key: 'readStatus',
                value: value[0] !== 'All' ? value[0] === 'Y' : undefined,
              })
            }
          />
        </>
      )}
      <ToggleGroup
        label='Sort'
        items={sortOrderOptionItems}
        value={[uiFilters.sortOrder]}
        onChange={(value) => updateUiFilter({ key: 'sortOrder', value: value[0] ?? 'title' })}
      />
      <div className={styles.ActionButtons}>
        <Button onClick={() => dispatch({ type: 'resetFilters' })}>Reset Filters</Button>
      </div>
    </form>
  );
};
