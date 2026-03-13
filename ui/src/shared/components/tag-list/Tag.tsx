import cn from 'classnames';

import * as styles from './TagList.module.css';

export type TagProps = {
  label: string;
  dark?: boolean;
};

export const Tag = ({ label, dark }: TagProps) => {
  const classNames = cn(styles.Tag, { [styles.Dark]: dark });

  return <li className={classNames}>{label}</li>;
};
