/* eslint-disable react/display-name */
import cn from 'classnames';
import { ReactNode, forwardRef } from 'react';

import './Card.css';

type CardProps = {
  children: ReactNode;
  highlight?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  className?: string;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, highlight, onClick, className }, ref) => {
    const classes = cn('ecms-card', className, { highlight: highlight });

    return (
      <div onClick={onClick} ref={ref} className={classes}>
        {children}
      </div>
    );
  },
);
