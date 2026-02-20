import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { ReactNode } from 'react';

import buttonStyles from '../button/Button.module.css';
import styles from './Dialog.module.css';

const { Root, Portal, Backdrop, Popup, Title, Close } = BaseDialog;

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
};

export const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  return (
    <Root open={open} onOpenChange={onOpenChange}>
      <Portal>
        <Backdrop className={styles.Backdrop} />
        <Popup className={styles.Popup}>
          <Title className={styles.Title}>Notifications</Title>
          {children}
          <div className={styles.Actions}>
            <Close className={buttonStyles.Root}>Close</Close>
          </div>
        </Popup>
      </Portal>
    </Root>
  );
};
