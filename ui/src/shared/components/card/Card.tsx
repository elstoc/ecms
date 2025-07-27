import cn from 'classnames';
import { ReactNode, forwardRef } from 'react';

import './Card.css';

type CardProps = {
  children: ReactNode;
  /** Give the card a stronger outline */
  highlight?: boolean;
  className?: string;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, highlight, className }, ref) => {
    const classes = cn('ecms-card', className, { highlight: highlight });

    return (
      <div ref={ref} className={classes}>
        {children}
      </div>
    );
  },
);
