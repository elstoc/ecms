import { useCallback } from 'react';
import { useSearchParams } from 'react-router';

export const useSetOrClearSearchParams = () => {
  const [, setSearchParams] = useSearchParams();

  const setOrClearSearchParams = useCallback(
    (key: string, value: string | undefined, replace?: boolean) => {
      setSearchParams(
        (params) => {
          if (value === undefined) {
            params.delete(key);
          } else {
            params.set(key, value);
          }

          return params;
        },
        { replace },
      );
    },
    [setSearchParams],
  );

  return setOrClearSearchParams;
};
