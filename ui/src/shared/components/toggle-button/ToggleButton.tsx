import cn from 'classnames';
import {
  ToggleButton as RaToggleButton,
  ToggleButtonProps as RaToggleButtonProps,
} from 'react-aria-components';

import '../button/Button.css';
import './ToggleButton.css';

type ToggleButtonProps = Pick<
  RaToggleButtonProps,
  'id' | 'children' | 'className' | 'isSelected' | 'onChange'
>;

export const ToggleButton = (props: ToggleButtonProps) => {
  const className = cn('ecms-toggle-button', 'ecms-button', props.className);

  return (
    <RaToggleButton {...props} className={className}>
      {props.children}
    </RaToggleButton>
  );
};
