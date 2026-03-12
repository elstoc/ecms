import { Button } from '@/shared/components/button';

import { useLogout } from '../hooks/useAuthQueries';

import './Welcome.css';

type WelcomeProps = { user: string };

export const Welcome = ({ user }: WelcomeProps) => {
  const { mutate: logout } = useLogout('logged out');
  const handleLogout = () => logout();

  return (
    <div className='welcome-user'>
      <div>You are currently logged in as {user}</div>
      <Button onClick={handleLogout}>Log Out</Button>
    </div>
  );
};
