import { Toggle as BaseToggle, ToggleProps as BaseToggleProps } from '@base-ui/react/toggle';
import cn from 'classnames';

import buttonStyles from '../button/Button.module.css';
import './Toggle.css';

type ToggleProps = Pick<
  BaseToggleProps<string>,
  'value' | 'children' | 'className' | 'pressed' | 'onPressedChange'
>;

export const Toggle = (props: ToggleProps) => {
  const className = cn('ec-toggle', buttonStyles.Root, props.className);

  return (
    <BaseToggle {...props} className={className}>
      {props.children}
    </BaseToggle>
  );
};
