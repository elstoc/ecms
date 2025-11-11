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
  return (
    <div className='ecms-toggle-button-group'>
      <Label>{label}</Label>
      <RaToggleButtonGroup {...props} disallowEmptySelection>
        {children}
      </RaToggleButtonGroup>
    </div>
  );
};
