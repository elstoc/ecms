import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToastManager } from '../components/toast';

export const useMutationWithToast = <T>(params: {
  mutationFn: (data: T) => Promise<void>;
  invalidateKeys: (string | number)[][] | 'all';
  successMessage: string;
  suppressErrorToast?: boolean;
}) => {
  const queryClient = useQueryClient();
  const { mutationFn, invalidateKeys, successMessage, suppressErrorToast } = params;
  const toaster = useToastManager();

  return useMutation({
    mutationFn,
    onSuccess: async () => {
      if (invalidateKeys === 'all') {
        queryClient.invalidateQueries({ refetchType: 'all' });
      } else {
        await Promise.allSettled(
          invalidateKeys.map((queryKey) =>
            queryClient.invalidateQueries({ queryKey, refetchType: 'all' }),
          ),
        );
      }
      toaster.add({ description: successMessage, timeout: 2000 });
    },
    onError: (err) => {
      if (!suppressErrorToast) {
        toaster.add({ description: `error: ${err.message}`, timeout: 5000 });
      }
    },
  });
};
