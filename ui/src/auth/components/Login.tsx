import { useState } from 'react';

import { Button } from '@/shared/components/button';
import { Input } from '@/shared/components/input';

import { useLogin } from '../hooks/useAuthQueries';

import './Login.css';

export const Login = () => {
  const [loginFailed, setLoginFailed] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: login } = useLogin('logged in');

  const userInfo = { userId, password };
  const handleLoginError = () => {
    setLoginFailed(true);
    setPassword('');
  };
  const handleLogin = () => login(userInfo, { onError: handleLoginError });

  return (
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
      <div className='error'>{loginFailed && 'Invalid UserId or password'}</div>
      <Button onClick={handleLogin}>Log In</Button>
    </div>
  );
};
