import { useGetUserInfo } from '..';
import { Card, Dialog, DialogBody } from '@blueprintjs/core';
import { Suspense, useState } from 'react';

import { Icon } from '@/shared/components/icon';
import { useSiteConfig } from '@/site';

import { Login } from './Login';
import { Welcome } from './Welcome';

import './UserInfo.scss';

export const UserInfo = () => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const userData = useGetUserInfo();
  const { authEnabled } = useSiteConfig();

  if (!authEnabled) {
    return <></>;
  }

  const loggedIn = userData.id !== 'guest';
  const userName = userData.fullName || userData.id;

  return (
    <div className='user-info'>
      <Card className='user-card'>
        <Icon name={loggedIn ? 'user' : 'noUser'} onClick={() => setAuthDialogOpen(true)} />
      </Card>
      <Dialog
        title={loggedIn ? 'Welcome' : 'Log in'}
        isOpen={authDialogOpen}
        onClose={() => setAuthDialogOpen(false)}
        className='auth-dialog'
      >
        <DialogBody>
          <Suspense>
            {loggedIn && <Welcome user={userName} />}
            {!loggedIn && <Login />}
          </Suspense>
        </DialogBody>
      </Dialog>
    </div>
  );
};
