import { useId } from 'react';
import {
  ToggleButtonGroup as RaToggleButtonGroup,
  ToggleButtonGroupProps as RaToggleButtonGroupProps,
} from 'react-aria-components';

import { Label } from '../label';

import './ToggleButtonGroup.css';

type ToggleButtonGroupProps = RaToggleButtonGroupProps & {
  label?: string;
};

export const ToggleButtonGroup = ({ children, label, ...props }: ToggleButtonGroupProps) => {
  const id = useId();

  return (
    <div className='ecms-toggle-button-group'>
      <Label id={id}>{label}</Label>
      <RaToggleButtonGroup {...props} aria-labelledby={id} disallowEmptySelection>
        {children}
      </RaToggleButtonGroup>
    </div>
  );
};
