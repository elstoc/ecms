import { useCallback, useState } from 'react';

import { Button } from '@/shared/components/button';
import { Input } from '@/shared/components/input';

import { useLogin } from '../hooks/useAuthQueries';

import './Login.css';

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
      <div className='login-form'>
        <Input
          label='User ID'
          value={userId}
          onChange={(value) => setUserId(value ?? '')}
          autoFocus={true}
          width='full'
        />
        <Input
          label='Password'
          type='password'
          value={password}
          onChange={(password) => setPassword(password ?? '')}
          onPressEnter={handleLogin}
          width='full'
        />
        <Button onClick={handleLogin}>Log In</Button>
      </div>
      {loginFailed && <div className='error'>Invalid UserId or password</div>}
    </div>
  );
};
