import cn from 'classnames';
import { ReactNode } from 'react';

import './TagList.css';

type TagListProps = {
  className?: string;
  label: string;
  children: ReactNode;
};

export const TagList = ({ label, className, children }: TagListProps) => {
  return (
    <ul aria-label={label} className={cn('ecms-tag-list', className)}>
      {children}
    </ul>
  );
};
