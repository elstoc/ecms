import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { ReactNode } from 'react';

import * as styles from './Overlay.module.css';

const { Root, Portal, Backdrop, Popup } = BaseDialog;

export type OverlayProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  disablePointerDismissal?: boolean;
  disableEscapeKeyDismissal?: boolean;
};

export const Overlay = ({
  open,
  onOpenChange,
  children,
  disablePointerDismissal,
  disableEscapeKeyDismissal,
}: OverlayProps) => {
  const handleOpenChange = (open: boolean, eventDetails: BaseDialog.Root.ChangeEventDetails) => {
    if (!disableEscapeKeyDismissal || eventDetails.reason !== 'escape-key') {
      onOpenChange(open);
    }
  };

  return (
    <Root
      open={open}
      onOpenChange={handleOpenChange}
      disablePointerDismissal={disablePointerDismissal}
    >
      <Portal>
        <Backdrop className={styles.Backdrop} />

        <Popup className={styles.Popup}>{children}</Popup>
      </Portal>
    </Root>
  );
};
