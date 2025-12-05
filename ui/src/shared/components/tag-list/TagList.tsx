import cn from 'classnames';
import { ReactNode } from 'react';

import './TagList.css';

type TagListProps = {
  className?: string;
  label: string;
  children: ReactNode;
};

export const TagList = ({ label, className, children }: TagListProps) => {
  const classNames = cn('ecms-tag-list', className);

  return (
    <ul aria-label={label} className={classNames}>
      {children}
    </ul>
  );
};
