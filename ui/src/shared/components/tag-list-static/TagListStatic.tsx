import cn from 'classnames';
import { ReactNode } from 'react';

import './TagListStatic.css';

export type TagStaticProps = {
  label: string;
  dark?: boolean;
};

type TagListStaticProps = {
  className?: string;
  label: string;
  children: ReactNode;
};

export const TagListStatic = ({ label, className, children }: TagListStaticProps) => {
  return (
    <ul aria-label={label} className={cn('ecms-tag-list-static', className)}>
      {children}
    </ul>
  );
};

export const Tag = ({ label, dark }: TagStaticProps) => {
  return <li className={cn('ecms-tag', { dark: dark })}>{label}</li>;
};
