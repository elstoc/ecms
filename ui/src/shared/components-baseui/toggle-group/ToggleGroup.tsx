import {
  ToggleGroup as BaseToggleGroup,
  ToggleGroupProps as BaseToggleGroupProps,
} from '@base-ui/react/toggle-group';

import './ToggleGroup.css';

type ToggleButtonGroupProps = Pick<
  BaseToggleGroupProps,
  'children' | 'value' | 'onValueChange' | 'className'
>;

export const ToggleGroup = ({ children, ...props }: ToggleButtonGroupProps) => {
  return <BaseToggleGroup {...props}>{children}</BaseToggleGroup>;
};
