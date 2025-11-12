import cn from 'classnames';
import {
  ToggleButton as RaToggleButton,
  ToggleButtonProps as RaToggleButtonProps,
} from 'react-aria-components';

import './ToggleButton.css';

type ToggleButtonProps = RaToggleButtonProps;

export const ToggleButton = (props: ToggleButtonProps) => {
  const className = cn('ecms-toggle-button', props.className);

  return (
    <RaToggleButton {...props} className={className}>
      {props.children}
    </RaToggleButton>
  );
};
