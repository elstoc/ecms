import { ReactNode } from 'react';

import * as styles from './TagList.module.css';

type TagListProps = {
  label: string;
  children: ReactNode;
};

export const TagList = ({ label, children }: TagListProps) => (
  <ul aria-label={label} className={styles.Root}>
    {children}
  </ul>
);
