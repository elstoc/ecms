import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';

import { KeyValueOfType } from '@/utils';

type SearchParamUiValues = {
  bookPath?: string;
};

type UseCalibreDbSearchParamsReturn = {
  searchParamsState: SearchParamUiValues;
  updateSearchParamState: (payload: KeyValueOfType<SearchParamUiValues>) => void;
  resetSearchParams: () => void;
};

export const useCalibreDbSearchParams = (): UseCalibreDbSearchParamsReturn => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParamState = useCallback(
    (payload: KeyValueOfType<SearchParamUiValues>): void => {
      if (payload.value === undefined) {
        setSearchParams((params) => {
          params.delete(payload.key);
          return params;
        });
      } else {
        setSearchParams((params) => {
          params.set(payload.key, payload.value!.toString());
          return params;
        });
      }
    },
    [setSearchParams],
  );

  const searchParamsState = useMemo<SearchParamUiValues>(
    () => ({
      bookPath: searchParams.get('bookPath') || undefined,
    }),
    [searchParams],
  );

  const resetSearchParams = () => setSearchParams();

  return { searchParamsState, updateSearchParamState, resetSearchParams };
};
