import cn from 'classnames';

import { Button, ButtonProps } from '../button';
import { Icon, IconProps } from '../icon';

import './IconButton.css';

type IconButtonProps = IconProps & Pick<ButtonProps, 'onPress' | 'slot'>;

export const IconButton = ({
  onPress,
  className,
  label,
  isDisabled,
  slot,
  ...iconProps
}: IconButtonProps) => {
  const classNames = cn('ecms-icon-button', className);
  return (
    <Button
      aria-label={label}
      clearFormatting
      className={classNames}
      isDisabled={isDisabled}
      onPress={onPress}
      slot={slot}
    >
      <Icon label={label} {...iconProps} />
    </Button>
  );
};
