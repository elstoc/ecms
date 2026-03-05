import { keepPreviousData, useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { config } from '@/utils';

type QueryOptions<T> = {
  queryKey: (string | number)[];
  queryFn: () => Promise<T>;
  staleTime?: number;
  refetchInterval?: number;
  gcTime?: number;
};

export const useCustomSuspenseQuery = <T>(options: QueryOptions<T>): T => {
  const { data } = useSuspenseQuery({ refetchInterval: config.queryRefetchInterval, ...options });
  return data;
};

export const useCustomQuery = <T>(options: QueryOptions<T>): T | undefined => {
  const { data } = useQuery({
    refetchInterval: config.queryRefetchInterval,
    ...options,
    placeholderData: keepPreviousData,
  });

  return data;
};
