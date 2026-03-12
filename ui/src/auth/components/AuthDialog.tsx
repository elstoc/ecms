import { Dialog } from '@/shared/components/dialog';

import { Login } from './Login';
import { Welcome } from './Welcome';

import * as styles from './AuthDialog.module.css';

type AuthDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  userName: string;
  isLoggedIn: boolean;
};

export const AuthDialog = ({ open, setOpen, userName, isLoggedIn }: AuthDialogProps) => (
  <Dialog title={isLoggedIn ? 'Welcome' : 'Log in'} open={open} onOpenChange={() => setOpen(false)}>
    <div className={styles.Root}>
      {isLoggedIn && <Welcome userName={userName} />}
      {!isLoggedIn && <Login />}
    </div>
  </Dialog>
);
