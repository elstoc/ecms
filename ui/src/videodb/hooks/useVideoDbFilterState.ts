import { useCallback, useContext, useEffect, useReducer, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { toIntOrUndefined } from '@/utils';

import { VideoDbStateContext } from './useVideoDbStateContext';

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
  watched: 'All',
  mediaWatched: 'All',
  minResolution: 'SD',
  flaggedOnly: null,
};

type SetStringField = {
  action: 'setFilter';
  key: 'titleContains' | 'categories' | 'tags' | 'watched' | 'mediaWatched' | 'minResolution';
  value: string | null;
};

type SetNumericField = { action: 'setFilter'; key: 'maxLength'; value: number | null };

type SetBooleanIntField = { action: 'setFilter'; key: 'flaggedOnly'; value: 0 | 1 | null };

type SetIndividualFilter = SetStringField | SetNumericField | SetBooleanIntField;

type FilterOperations = SetIndividualFilter | { action: 'setAllFilters'; value: FilterState };

const filterReducer: (state: FilterState, operation: FilterOperations) => FilterState = (
  state,
  operation,
) => {
  if (operation.action === 'setFilter') {
    return { ...state, [operation.key]: operation.value };
  } else if (operation.action === 'setAllFilters') {
    return { ...operation.value };
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
  const {
    titleContains,
    maxLength,
    categories,
    watched,
    mediaWatched,
    minResolution,
    tags,
    flaggedOnly,
  } = state;

  const minResolutionParam = ['HD', 'UHD'].includes(minResolution ?? '') ? minResolution : '';
  const watchedParam = ['Y', 'N'].includes(watched ?? '') ? watched : '';
  const mediaWatchedParam = ['Y', 'N'].includes(mediaWatched ?? '') ? mediaWatched : '';
  const flaggedOnlyParam = flaggedOnly ? '1' : '';

  setOrDeleteParam(params, 'categories', categories);
  setOrDeleteParam(params, 'maxLength', maxLength?.toString());
  setOrDeleteParam(params, 'titleContains', titleContains);
  setOrDeleteParam(params, 'tags', tags);
  setOrDeleteParam(params, 'watched', watchedParam);
  setOrDeleteParam(params, 'mediaWatched', mediaWatchedParam);
  setOrDeleteParam(params, 'minResolution', minResolutionParam);
  setOrDeleteParam(params, 'flaggedOnly', flaggedOnlyParam);

  return params;
};

export const useVideoDbFilterState = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { videoDbReducer } = useContext(VideoDbStateContext);
  const [state, stateReducer] = useReducer(filterReducer, initialFilters);
  const [syncState, setSyncState] = useState(false);

  const handlerRef = useRef<NodeJS.Timeout | null>(null);

  // set state from search params on initial load
  useEffect(() => {
    stateReducer({
      action: 'setAllFilters',
      value: {
        maxLength: toIntOrUndefined(searchParams.get('maxLength')) ?? null,
        titleContains: searchParams.get('titleContains'),
        categories: searchParams.get('categories') ?? null,
        tags: searchParams.get('tags') ?? null,
        watched: searchParams.get('watched') ?? 'All',
        mediaWatched: searchParams.get('mediaWatched') ?? 'All',
        minResolution: searchParams.get('minResolution') ?? 'SD',
        flaggedOnly: (toIntOrUndefined(searchParams.get('flaggedOnly')) as null | 0 | 1) ?? null,
      },
    });
  }, []);

  // update search params to match state when instructed
  useEffect(() => {
    if (syncState) {
      setSyncState(false);
      videoDbReducer({ action: 'resetLimit' });
      setSearchParams((params) => getSearchParamsFromState(params, state));
    }
  }, [syncState]);

  const clearAllFilters = useCallback(() => {
    stateReducer({ action: 'setAllFilters', value: initialFilters });
    setSearchParams();
  }, [setSearchParams, stateReducer]);

  const updateState = useCallback(
    (operation: SetIndividualFilter) => {
      // update state immediately
      stateReducer(operation);

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
    [stateReducer],
  );

  return { state, updateState, clearAllFilters };
};
