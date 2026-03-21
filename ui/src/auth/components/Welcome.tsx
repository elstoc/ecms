import { Button } from '@/shared/components/button';

import { useLogout } from '../hooks/useAuthQueries';

type WelcomeProps = { userName: string };

export const Welcome = ({ userName }: WelcomeProps) => {
  const { mutate: logout } = useLogout();
  const handleLogout = () => logout();

  return (
    <>
      <div>You are currently logged in as {userName}</div>
      <Button onClick={handleLogout}>Log Out</Button>
    </>
  );
};
