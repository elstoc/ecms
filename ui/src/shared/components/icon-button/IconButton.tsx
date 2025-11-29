import cn from 'classnames';

import { Button, ButtonProps } from '../button';
import { Icon, IconProps } from '../icon';

import './IconButton.css';

type IconButtonProps = IconProps & {
  onPress: ButtonProps['onPress'];
};

export const IconButton = ({
  onPress,
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
      isDisabled={disabled}
      onPress={onPress}
    >
      <Icon label={label} {...iconProps} />
    </Button>
  );
};
