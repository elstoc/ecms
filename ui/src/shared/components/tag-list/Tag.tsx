import cn from 'classnames';

import './Tag.css';

export type TagProps = {
  label: string;
  dark?: boolean;
  className?: string;
};

export const Tag = ({ label, dark, className }: TagProps) => {
  const classNames = cn('ecms-tag', { dark: dark }, className);

  return <li className={classNames}>{label}</li>;
};
