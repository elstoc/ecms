import { Button } from '@/shared/components/button';

import { useLogout } from '../hooks/useAuthQueries';

import './Welcome.css';

type WelcomeProps = { user: string };

export const Welcome = ({ user }: WelcomeProps) => {
  const { mutate } = useLogout('logged out');

  return (
    <div className='welcome-user'>
      <div>You are currently logged in as {user}</div>
      <Button onPress={() => mutate()}>Log Out</Button>
    </div>
  );
};
