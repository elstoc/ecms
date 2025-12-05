import cn from 'classnames';

export type TagProps = {
  label: string;
  dark?: boolean;
};

export const Tag = ({ label, dark }: TagProps) => {
  return <li className={cn('ecms-tag', { dark: dark })}>{label}</li>;
};
