import { getUserInfo } from '../api';
import { useCustomQuery } from '../../common/hooks';

export const useUserInfo = () => {
    return useCustomQuery({
        queryKey: ['user-info'],
        queryFn: getUserInfo,
    });
};

export const useUserIsAdmin = () => {
    const user = useUserInfo();
    return user.roles?.includes('admin');
};
