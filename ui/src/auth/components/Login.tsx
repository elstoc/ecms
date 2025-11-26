import { useCallback, useState } from 'react';

import { Button } from '@/shared/components/button';
import { Card } from '@/shared/components/card';
import { Input } from '@/shared/legacy-components/forms';

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
        <Input
          label='User ID'
          value={userId}
          onChange={(value) => setUserId(value ?? '')}
          autoFocus={true}
          inline={true}
        />
        <Input
          label='Password'
          type='password'
          value={password}
          onChange={(password) => setPassword(password ?? '')}
          onPressEnter={handleLogin}
          inline={true}
        />
        <Button onPress={handleLogin}>Log In</Button>
      </Card>
      <div className='error'>{loginFailed && 'Invalid UserId or password'}</div>
    </div>
  );
};
