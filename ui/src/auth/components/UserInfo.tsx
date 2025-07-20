import { useUserInfo } from '..';
import { Dialog, DialogBody } from '@blueprintjs/core';
import { Suspense, useState } from 'react';

import { Icon } from '@/shared/components/icon';
import { Toolbox } from '@/shared/components/layout';
import { useSiteConfig } from '@/site';

import { Login } from './Login';
import { Welcome } from './Welcome';

import './UserInfo.css';

export const UserInfo = () => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const userData = useUserInfo();
  const { authEnabled } = useSiteConfig();

  if (!authEnabled) {
    return <></>;
  }

  const loggedIn = userData.id !== 'guest';
  const userName = userData.fullName || userData.id;

  return (
    <div className='user-info'>
      <Toolbox>
        <Icon
          label={loggedIn ? 'log out' : 'log in'}
          name={loggedIn ? 'user' : 'noUser'}
          onClick={() => setAuthDialogOpen(true)}
        />
      </Toolbox>
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
