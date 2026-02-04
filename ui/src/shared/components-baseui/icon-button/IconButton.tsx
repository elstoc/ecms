import cn from 'classnames';

import { Icon, IconProps } from '@/shared/components/icon';

import { Button, ButtonProps } from '../button';

import './IconButton.css';

type IconButtonProps = IconProps & Pick<ButtonProps, 'disabled' | 'onClick'>;

export const IconButton = ({
  onClick,
  className,
  label,
  disabled,
  ...iconProps
}: IconButtonProps) => {
  const classNames = cn('ecms-icon-button', className);
  return (
    <Button
      aria-label={label}
      clearFormatting
      className={classNames}
      disabled={disabled}
      onClick={onClick}
    >
      <Icon label={label} {...iconProps} />
    </Button>
  );
};
