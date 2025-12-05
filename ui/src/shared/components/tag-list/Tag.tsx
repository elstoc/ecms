import cn from 'classnames';

export type TagProps = {
  label: string;
  dark?: boolean;
  className?: string;
};

export const Tag = ({ label, dark, className }: TagProps) => {
  const classNames = cn('ecms-tag', { dark: dark }, className);

  return <li className={classNames}>{label}</li>;
};
