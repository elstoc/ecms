import { useCustomQuery, useMutationWithToast } from '@/shared/hooks';
import { useSiteConfig } from '@/site';

import { getUserInfo, login, logout } from '../api';

export const useUserInfo = () => {
  return useCustomQuery({ queryKey: ['user-info'], queryFn: getUserInfo });
};

export const useUserIsAdmin = () => {
  const user = useUserInfo();
  const { authEnabled } = useSiteConfig();
  return !authEnabled || (user.roles ?? []).includes('admin');
};

export const useLogin = (successMessage: string) => {
  return useMutationWithToast<{ userId: string; password: string }>({
    mutationFn: ({ userId, password }) => login(userId, password),
    invalidateKeys: 'all',
    successMessage,
  });
};

export const useLogout = (successMessage: string) => {
  return useMutationWithToast<void>({
    mutationFn: () => logout(),
    invalidateKeys: 'all',
    successMessage,
  });
};
