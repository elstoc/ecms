import { useUserInfo } from '..';
import { useState } from 'react';

import { Dialog } from '@/shared/components/dialog';
import { IconButton } from '@/shared/components/icon-button';
import { Toolbox } from '@/shared/components/layout';
import { useSiteConfig } from '@/site';

import { Login } from './Login';
import { Welcome } from './Welcome';

export const UserInfo = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
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
          onClick={() => setDialogOpen(true)}
        />
      </Toolbox>
      <Dialog
        title={loggedIn ? 'Welcome' : 'Log in'}
        open={dialogOpen}
        onOpenChange={() => setDialogOpen(false)}
      >
        {loggedIn && <Welcome user={userName} />}
        {!loggedIn && <Login />}
      </Dialog>
    </div>
  );
};
