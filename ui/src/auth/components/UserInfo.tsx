import { useUserInfo } from '..';
import { Suspense, useState } from 'react';

import { Dialog } from '@/shared/components/dialog';
import { IconButton } from '@/shared/components/icon-button';
import { Toolbox } from '@/shared/components/layout';
import { useSiteConfig } from '@/site';

import { Login } from './Login';
import { Welcome } from './Welcome';

import './UserInfo.css';

export const UserInfo = () => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const userData = useUserInfo();
  const { authEnabled } = useSiteConfig() ?? {};

  if (!authEnabled || !userData) {
    return <></>;
  }

  const loggedIn = userData.id !== 'guest';
  const userName = userData.fullName || userData.id;

  return (
    <div className='user-info'>
      <Toolbox>
        <IconButton
          label={loggedIn ? 'log out' : 'log in'}
          icon={loggedIn ? 'user' : 'noUser'}
          onClick={() => setAuthDialogOpen(true)}
        />
      </Toolbox>
      <Dialog
        title={loggedIn ? 'Welcome' : 'Log in'}
        open={authDialogOpen}
        onOpenChange={() => setAuthDialogOpen(false)}
      >
        <Suspense>
          {loggedIn && <Welcome user={userName} />}
          {!loggedIn && <Login />}
        </Suspense>
      </Dialog>
    </div>
  );
};
