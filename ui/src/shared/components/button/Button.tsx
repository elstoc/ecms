import { Button as BPButton, IconName } from '@blueprintjs/core';
import { ReactNode } from 'react';

type ButtonProps = {
  role?: React.AriaRole;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  children?: ReactNode;
  className?: string;
  icon?: IconName;
  tabIndex?: number;
  disabled?: boolean;
};

export const Button = ({
  onClick,
  tabIndex,
  children,
  role,
  className,
  icon,
  disabled,
}: ButtonProps) => {
  return (
    <BPButton
      disabled={disabled}
      tabIndex={tabIndex}
      icon={icon}
      className={className}
      role={role}
      onClick={onClick}
    >
      {children}
    </BPButton>
  );
};
