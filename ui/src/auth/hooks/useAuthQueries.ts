import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useCustomQuery } from '@/shared/hooks';
import { useSiteConfig } from '@/site';

import { getUserInfo, login, logout } from '../api';

export const useUserInfo = () => {
  return useCustomQuery({ queryKey: ['user-info'], queryFn: getUserInfo });
};

export const useUserIsAdmin = () => {
  const user = useUserInfo();
  const { authEnabled } = useSiteConfig() ?? {};
  return !authEnabled || !user || (user.roles ?? []).includes('admin');
};

type UserWithPassword = { userId: string; password: string };

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, password }: UserWithPassword) => login(userId, password),
    onSuccess: () => queryClient.invalidateQueries({ refetchType: 'all' }),
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => queryClient.invalidateQueries({ refetchType: 'all' }),
  });
};
