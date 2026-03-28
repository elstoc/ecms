import cn from 'classnames';
import { ReactNode, Ref } from 'react';

import './Card.css';

type CardProps = {
  children: ReactNode;
  /** Give the card a stronger outline */
  highlight?: boolean;
  /** Class name for the wrapping div (in addition to `ecms-card`) */
  className?: string;
  ref?: Ref<HTMLDivElement>;
  onClick?: () => void;
};

export const Card = ({ children, highlight, className, onClick, ref }: CardProps) => {
  const classes = cn('ecms-card', className, { highlight: highlight });

  return (
    <div ref={ref} className={classes} onClick={onClick}>
      {children}
    </div>
  );
};
