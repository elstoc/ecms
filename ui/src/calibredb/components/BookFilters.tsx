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

  const { state, updateFilter, resetFilters, toggleMode } = useCalibreDb();

  let readStatusCode: 'Y' | 'N' | undefined;
  if (state.readStatus != null) {
    readStatusCode = state.readStatus ? 'Y' : 'N';
  }

  return (
    <form role='search' aria-labelledby='book-search-title' className={styles.Filters}>
      <ToggleGroup
        label='Mode'
        items={modeOptionItems}
        value={[state.mode]}
        onChange={toggleMode}
      />
      <Input
        label='Title Search'
        value={state.titleContains ?? ''}
        onChange={(value) => updateFilter({ key: 'titleContains', value: value || undefined })}
        width='full'
        debounceTimeout={1000}
      />
      <TagSelect
        label='Devices'
        selectableTags={['kobo', 'tablet', 'kindle', 'physical']}
        selectedTags={state.devices ?? []}
        onChange={(value) =>
          updateFilter({ key: 'devices', value: value.length ? value : undefined })
        }
        emptyMessage='No devices found'
        disabled={Boolean(state.mode === 'browse' && state.bookPath)}
        width='full'
      />
      <Combobox
        label='Path'
        items={allPathItems}
        emptyMessage='No paths found'
        value={state.bookPath ?? null}
        onChange={(value) => updateFilter({ key: 'bookPath', value: value ?? undefined })}
        maxListItems={100}
        disabled={state.mode === 'browse'}
        width='full'
      />
      <Combobox
        label='Author'
        items={allAuthorItems}
        value={state.author?.toString() ?? null}
        onChange={(value) => updateFilter({ key: 'author', value: toIntOrUndefined(value) })}
        emptyMessage='No authors found'
        maxListItems={100}
        disabled={state.mode === 'browse'}
        width='full'
      />
      <div className={styles.Row}>
        <SelectLookup
          label='Format'
          lookupTable='formats'
          valueForNullCode='All'
          value={state.format?.toString() ?? null}
          onChange={(value) => updateFilter({ key: 'format', value: toIntOrUndefined(value) })}
          disabled={state.mode === 'browse'}
        />
        <ToggleGroup
          label='Read'
          items={readStatusOptionItems}
          value={[readStatusCode ?? 'All']}
          onChange={(value) =>
            updateFilter({
              key: 'readStatus',
              value: value[0] !== 'All' ? value[0] === 'Y' : undefined,
            })
          }
          disabled={state.mode === 'browse'}
        />
      </div>
      <div className={styles.ActionButtons}>
        <Button onClick={resetFilters}>Reset Filters</Button>
      </div>
    </form>
  );
};
