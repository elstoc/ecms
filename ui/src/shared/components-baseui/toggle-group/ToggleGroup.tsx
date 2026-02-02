import { Field } from '@base-ui/react/field';
import {
  ToggleGroup as BaseToggleGroup,
  ToggleGroupProps as BaseToggleGroupProps,
} from '@base-ui/react/toggle-group';

import './ToggleGroup.css';

type ToggleButtonGroupProps = Pick<
  BaseToggleGroupProps,
  'children' | 'value' | 'onValueChange' | 'className'
> & {
  label: string;
};

export const ToggleGroup = ({ children, ...props }: ToggleButtonGroupProps) => {
  return (
    <Field.Root>
      <Field.Label aria-hidden>{props.label}</Field.Label>
      <BaseToggleGroup {...props} aria-label={props.label}>
        {children}
      </BaseToggleGroup>
    </Field.Root>
  );
};
