import { useUserInfo } from '..';
import { useState } from 'react';

import { IconButton } from '@/shared/components/icon-button';
import { Toolbar } from '@/shared/components/toolbar';
import { useSiteConfig } from '@/site';

import { AuthDialog } from './AuthDialog';

export const UserTools = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const userData = useUserInfo();
  const { authEnabled } = useSiteConfig() ?? {};

  if (!authEnabled || !userData) {
    return <></>;
  }

  const isLoggedIn = userData.id !== 'guest';
  const userName = userData.fullName || userData.id;

  return (
    <>
      <Toolbar.Root>
        <IconButton
          label={isLoggedIn ? 'log out' : 'log in'}
          icon={isLoggedIn ? 'user' : 'noUser'}
          onClick={() => setDialogOpen(true)}
        />
      </Toolbar.Root>
      <AuthDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        userName={userName}
        isLoggedIn={isLoggedIn}
      />
    </>
  );
};
