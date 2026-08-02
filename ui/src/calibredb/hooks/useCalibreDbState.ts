import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';

import { useSetOrClearSearchParams } from '@/shared/hooks';
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
  const setOrClearSearchParam = useSetOrClearSearchParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [shuffleSeed, setShuffleSeed] = useState(1);
  const [pages, setPages] = useState(1);

  const searchParamState = useMemo(() => getStateFromUiSearchParams(searchParams), [searchParams]);
  const { mode } = searchParamState;

  const updateFilter = useCallback(
    (payload: KeyValueOfType<SearchParamState>) => {
      const newSearchParamValue = getUiSearchParamForKey(payload);
      const { key, value } = payload;

      setOrClearSearchParam(key, newSearchParamValue, mode === 'search');
      setPages(1);

      if (key === 'sortOrder' && value === 'shuffle') {
        setShuffleSeed(getRandomSeed());
      }
    },
    [mode, setPages, setOrClearSearchParam],
  );

  const resetFilters = useCallback(
    (newMode?: string) => {
      setSearchParams(newMode === 'search' ? { mode: 'search' } : undefined);
      setPages(1);
      setShuffleSeed(1);
    },
    [setSearchParams],
  );

  const toggleMode = useCallback(() => {
    resetFilters(mode === 'browse' ? 'search' : 'browse');
  }, [mode, resetFilters]);

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
