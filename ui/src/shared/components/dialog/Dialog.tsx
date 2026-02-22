import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { ReactNode } from 'react';

import styles from './Dialog.module.css';

const { Root, Portal, Backdrop, Popup, Title, Close, Description: Content } = BaseDialog;

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  title: string;
};

export const Dialog = ({ open, onOpenChange, children, title }: DialogProps) => {
  return (
    <Root open={open} onOpenChange={onOpenChange}>
      <Portal>
        <Backdrop className={styles.Backdrop} />
        <Popup className={styles.Popup}>
          <div className={styles.Header}>
            <Title className={styles.Title}>{title}</Title>
            <CloseButton />
          </div>
          <Content className={styles.Content}>{children}</Content>
        </Popup>
      </Portal>
    </Root>
  );
};

const CloseButton = () => (
  <Close className={styles.CloseButton} aria-label='Close'>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M18 6 6 18' />
      <path d='m6 6 12 12' />
    </svg>
  </Close>
);
