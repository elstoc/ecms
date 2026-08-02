import { useCallback } from 'react';
import { useSearchParams } from 'react-router';

export const useSetOrClearSearchParams = () => {
  const [, setSearchParams] = useSearchParams();

  const setOrClearSearchParams = useCallback(
    (updatedParams: Record<string, string | undefined>, replace?: boolean) => {
      setSearchParams(
        (params) => {
          Object.entries(updatedParams).forEach(([key, value]) => {
            if (value === undefined) {
              params.delete(key);
            } else {
              params.set(key, value);
            }
          });

          return params;
        },
        { replace },
      );
    },
    [setSearchParams],
  );

  return setOrClearSearchParams;
};
