import cn from 'classnames';
import { ReactNode, Ref } from 'react';

import * as styles from './Card.module.css';

type CardProps = {
  children: ReactNode;
  /** Give the card a stronger outline */
  highlight?: boolean;
  /** Additional class name for the wrapping div */
  className?: string;
  ref?: Ref<HTMLDivElement>;
  onClick?: () => void;
};

export const Card = ({ children, highlight, className, onClick, ref }: CardProps) => {
  const classes = cn(styles.Root, className, { [styles.Highlight]: highlight });

  return (
    <div ref={ref} className={classes} onClick={onClick}>
      {children}
    </div>
  );
};
