import cn from 'classnames';

import { Icon, IconProps } from '@/shared/components/icon';

import { Button, ButtonProps } from '../button';

import styles from './IconButton.module.css';

type IconButtonProps = IconProps & Pick<ButtonProps, 'disabled' | 'onClick'>;

export const IconButton = ({
  onClick,
  className,
  label,
  disabled,
  ...iconProps
}: IconButtonProps) => {
  const classNames = cn(styles.Root, className);
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
