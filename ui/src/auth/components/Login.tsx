import { Button, Card } from '@blueprintjs/core';
import { useCallback, useState } from 'react';

import { PasswordInput, StringInput } from '@/shared/components/forms';

import { useLogin } from '../hooks/useAuthQueries';

import './Login.scss';

export const Login = () => {
  const [loginFailed, setLoginFailed] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const { mutate } = useLogin('logged in');

  const handleLogin = useCallback(async () => {
    mutate(
      { userId, password },
      {
        onError: () => {
          setLoginFailed(true);
          setPassword('');
        },
      },
    );
  }, [mutate, userId, password]);

  return (
    <div className='login'>
      <Card className='login-form'>
        <StringInput
          label='User ID'
          value={userId}
          onValueChange={setUserId}
          autoFocus={true}
          inline={true}
        />
        <PasswordInput
          label='Password'
          value={password}
          onValueChange={setPassword}
          onPressEnter={handleLogin}
          inline={true}
        />
        <Button onClick={handleLogin}>Log In</Button>
      </Card>
      <div className='error'>{loginFailed && 'Invalid UserId or password'}</div>
    </div>
  );
};
