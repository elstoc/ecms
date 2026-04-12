import { Toolbar as BaseToolbar } from '@base-ui/react/toolbar';
import { ReactNode } from 'react';

import * as styles from './Toolbar.module.css';

type ToolbarProps = {
  children: ReactNode;
  orientation?: 'horizontal' | 'vertical';
};

export const Toolbar = ({ children, orientation = 'horizontal' }: ToolbarProps) => {
  return (
    <BaseToolbar.Root className={styles.Root} orientation={orientation}>
      {children}
    </BaseToolbar.Root>
  );
};
