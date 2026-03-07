import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { config } from '@/utils';

type QueryOptions<T> = {
  queryKey: (string | number)[];
  queryFn: () => Promise<T>;
  staleTime?: number;
  refetchInterval?: number;
  gcTime?: number;
};

export const useCustomQuery = <T>(options: QueryOptions<T>): T | undefined => {
  const { data } = useQuery({
    refetchInterval: config.queryRefetchInterval,
    ...options,
    placeholderData: keepPreviousData,
  });

  return data;
};
