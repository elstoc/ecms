import cn from 'classnames';
import { ReactNode, forwardRef } from 'react';

import './Card.css';

type CardProps = {
  children: ReactNode;
  /** Give the card a stronger outline */
  highlight?: boolean;
  /** Containing div will be given an role of 'button' and cursor will change to pointer */
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  className?: string;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, highlight, onClick, className }, ref) => {
    const classes = cn('ecms-card', className, { highlight: highlight });

    return (
      <div role={onClick ? 'button' : undefined} onClick={onClick} ref={ref} className={classes}>
        {children}
      </div>
    );
  },
);
