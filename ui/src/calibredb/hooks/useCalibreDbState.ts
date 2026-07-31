import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';

import { KeyValueOfType, getRandomSeed } from '@/utils';

import { CalibreDbProviderValue, CalibreDbState } from '../components/CalibreDbProvider';
import {
  SearchParamState,
  getApiQueryParamsFromState,
  getStateFromUiSearchParams,
  getUiSearchParamForKey,
} from '../utils/searchParamStateMapper';

type UseCalibreDbStateProps = { title: string; apiPath: string };

export const useCalibreDbState = ({
  title,
  apiPath,
}: UseCalibreDbStateProps): CalibreDbProviderValue => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [shuffleSeed, setShuffleSeed] = useState(1);
  const [pages, setPages] = useState(1);

  const searchParamState = useMemo(() => getStateFromUiSearchParams(searchParams), [searchParams]);
  const { mode } = searchParamState;

  const updateFilter = useCallback(
    (payload: KeyValueOfType<SearchParamState>) => {
      const newSearchParamValue = getUiSearchParamForKey(payload);

      setSearchParams(
        (params) => {
          if (newSearchParamValue === undefined) {
            params.delete(payload.key);
          } else {
            params.set(payload.key, newSearchParamValue);
          }
          return params;
        },
        { replace: mode === 'search' },
      );

      setPages(1);

      if (payload.key === 'sortOrder' && payload.value === 'shuffle') {
        setShuffleSeed(getRandomSeed());
      }
    },
    [mode, setPages, setSearchParams],
  );

  const toggleMode = useCallback(() => {
    const newMode = mode === 'browse' ? 'search' : 'browse';
    if (newMode === 'search') {
      // reset everything except mode to default (undefined)
      setSearchParams({ mode: 'search' });
    } else {
      // 'browse' mode is the default so has empty search params
      setSearchParams();
    }
    setPages(1);
    setShuffleSeed(1);
  }, [mode, setSearchParams]);

  const resetFilters = useCallback(() => {
    setSearchParams();
    setPages(1);
    setShuffleSeed(1);
  }, [setSearchParams]);

  const state: CalibreDbState = {
    title,
    apiPath,
    pages,
    shuffleSeed,
    ...searchParamState,
  };

  const apiQueryParams = getApiQueryParamsFromState(state);

  return { state, updateFilter, toggleMode, resetFilters, setPages, apiQueryParams };
};
