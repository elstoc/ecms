import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { ReactNode } from 'react';

import styles from './Dialog.module.css';

type DialogBodyProps = {
  children: ReactNode;
};

export const DialogBody = ({ children }: DialogBodyProps) => (
  <BaseDialog.Description className={styles.Description}>{children}</BaseDialog.Description>
);
