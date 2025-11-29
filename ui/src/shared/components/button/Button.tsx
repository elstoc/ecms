import cn from 'classnames';
import { Button as RaButton, ButtonProps as RaButtonProps } from 'react-aria-components';

import './Button.css';

export type ButtonProps = Pick<
  RaButtonProps,
  'children' | 'slot' | 'type' | 'onPress' | 'isDisabled'
> & {
  /** Class name (in addition to `ecms-button`) */
  className?: string;
  /** Remove background and border */
  clearFormatting?: boolean;
};

export const Button = (props: ButtonProps) => {
  const className = cn('ecms-button', props.className, {
    'clear-formatting': props.clearFormatting,
  });

  return <RaButton {...props} className={className} />;
};
