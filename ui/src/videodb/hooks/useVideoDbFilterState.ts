import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { toIntOrUndefined } from '@/utils';

import { useVideoDb } from './useVideoDb';

type FilterState = {
  maxLength: number | null;
  categories: string | null;
  tags: string | null;
  titleContains: string | null;
  watched: string | null;
  mediaWatched: string | null;
  minResolution: string | null;
  flaggedOnly: 0 | 1 | null;
};

const initialFilters: FilterState = {
  maxLength: null,
  categories: null,
  tags: null,
  titleContains: null,
  watched: '',
  mediaWatched: '',
  minResolution: '',
  flaggedOnly: null,
};

type SetStringFilter = {
  type: 'setFilter';
  key: 'titleContains' | 'categories' | 'tags' | 'watched' | 'mediaWatched' | 'minResolution';
  value: string | null;
};
type SetNumericFilter = { type: 'setFilter'; key: 'maxLength'; value: number | null };
type SetBooleanIntFilter = { type: 'setFilter'; key: 'flaggedOnly'; value: 0 | 1 | null };
type SetAllFilters = { type: 'setAllFilters'; value: FilterState };

type SetIndividualFilter = SetStringFilter | SetNumericFilter | SetBooleanIntFilter;
type FilterAction = SetIndividualFilter | SetAllFilters;

const filterReducer: (state: FilterState, action: FilterAction) => FilterState = (
  state,
  action,
) => {
  if (action.type === 'setFilter') {
    return { ...state, [action.key]: action.value };
  } else if (action.type === 'setAllFilters') {
    return { ...action.value };
  }
  return state;
};

const setOrDeleteParam = (params: URLSearchParams, key: string, value?: string | null) => {
  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }
  return params;
};

const getSearchParamsFromState: (params: URLSearchParams, state: FilterState) => URLSearchParams = (
  params,
  state,
) => {
  setOrDeleteParam(params, 'categories', state.categories);
  setOrDeleteParam(params, 'maxLength', state.maxLength?.toString());
  setOrDeleteParam(params, 'titleContains', state.titleContains);
  setOrDeleteParam(params, 'tags', state.tags);
  setOrDeleteParam(params, 'watched', state.watched);
  setOrDeleteParam(params, 'mediaWatched', state.mediaWatched);
  setOrDeleteParam(params, 'minResolution', state.minResolution);
  setOrDeleteParam(params, 'flaggedOnly', state.flaggedOnly ? '1' : '');

  return params;
};

export const useVideoDbFilterState = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { dispatch } = useVideoDb();
  const [filterState, filterDispatch] = useReducer(filterReducer, initialFilters);
  const [syncState, setSyncState] = useState(false);

  const handlerRef = useRef<NodeJS.Timeout | null>(null);

  // set state from search params on initial load
  useEffect(() => {
    filterDispatch({
      type: 'setAllFilters',
      value: {
        maxLength: toIntOrUndefined(searchParams.get('maxLength')) ?? null,
        titleContains: searchParams.get('titleContains'),
        categories: searchParams.get('categories') ?? null,
        tags: searchParams.get('tags') ?? null,
        watched: searchParams.get('watched') ?? '',
        mediaWatched: searchParams.get('mediaWatched') ?? '',
        minResolution: searchParams.get('minResolution') ?? '',
        flaggedOnly: (toIntOrUndefined(searchParams.get('flaggedOnly')) as null | 0 | 1) ?? null,
      },
    });
  }, []);

  // update search params to match state when instructed
  useEffect(() => {
    if (syncState) {
      setSyncState(false);
      dispatch({ type: 'resetPages' });
      setSearchParams((params) => getSearchParamsFromState(params, filterState));
    }
  }, [syncState]);

  const clearAllFilters = useCallback(() => {
    filterDispatch({ type: 'setAllFilters', value: initialFilters });
    setSearchParams();
  }, [setSearchParams, filterDispatch]);

  const updateFilterState = useCallback(
    (operation: SetIndividualFilter) => {
      // update state immediately
      filterDispatch(operation);

      // update search params with a delay (debounce)
      if (handlerRef.current) {
        clearTimeout(handlerRef.current);
        handlerRef.current = null;
      }

      // delay should be longer for typed fields
      const timeout = ['titleContains', 'maxLength'].includes(operation.key) ? 1000 : 10;

      handlerRef.current = setTimeout(() => {
        setSyncState(true);
      }, timeout);
    },
    [filterDispatch],
  );

  return { filterState, updateFilterState, clearAllFilters };
};
