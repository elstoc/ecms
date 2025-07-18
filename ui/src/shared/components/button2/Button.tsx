import cn from 'classnames';
import { Button as RaButton, ButtonProps as RaButtonProps } from 'react-aria-components';

import './Button.css';

type ButtonProps = RaButtonProps & {
  clearFormatting?: boolean;
};

export const Button = (props: ButtonProps) => {
  const className = cn('ecms-button', props.className, {
    'clear-formatting': props.clearFormatting,
  });

  return <RaButton {...props} className={className} />;
};
