import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';

import { KeyValueOfType } from '@/utils';

type SearchParamUiValues = {
  bookPath?: string;
};

type UseCalibreDbSearchParamsReturn = {
  searchParamsState: SearchParamUiValues;
  updateSearchParamState: (payload: KeyValueOfType<SearchParamUiValues>, replace?: boolean) => void;
  resetSearchParams: () => void;
};

export const useCalibreDbSearchParams = (): UseCalibreDbSearchParamsReturn => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParamState = useCallback(
    (payload: KeyValueOfType<SearchParamUiValues>, replace?: boolean): void => {
      console.log(replace);
      if (payload.value === undefined) {
        setSearchParams(
          (params) => {
            params.delete(payload.key);
            return params;
          },
          { replace },
        );
      } else {
        setSearchParams(
          (params) => {
            params.set(payload.key, payload.value!.toString());
            return params;
          },
          { replace },
        );
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
