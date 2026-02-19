import { Dialog as BaseDialog } from '@base-ui/react/dialog';

import buttonStyles from '../button/Button.module.css';
import styles from './Dialog.module.css';

const { Root, Portal, Backdrop, Popup, Title, Description, Close } = BaseDialog;

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const Dialog = ({ open, onOpenChange }: DialogProps) => {
  return (
    <Root open={open} onOpenChange={onOpenChange}>
      <Portal>
        <Backdrop className={styles.Backdrop} />
        <Popup className={styles.Popup}>
          <Title className={styles.Title}>Notifications</Title>
          <Description className={styles.Description}>You are all caught up. Good job!</Description>
          <div className={styles.Actions}>
            <Close className={buttonStyles.Root}>Close</Close>
          </div>
        </Popup>
      </Portal>
    </Root>
  );
};
