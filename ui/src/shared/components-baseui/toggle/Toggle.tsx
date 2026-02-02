import { Toggle as BaseToggle, ToggleProps as BaseToggleProps } from '@base-ui/react/toggle';
import cn from 'classnames';

import '../button/Button.css';
import './Toggle.css';

type ToggleProps = Pick<
  BaseToggleProps,
  'value' | 'children' | 'className' | 'pressed' | 'onPressedChange'
>;

export const Toggle = (props: ToggleProps) => {
  const className = cn('ec-toggle', 'ec-button', props.className);

  return (
    <BaseToggle {...props} className={className}>
      {props.children}
    </BaseToggle>
  );
};
