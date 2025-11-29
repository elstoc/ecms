import { useId } from 'react';
import {
  Key,
  ToggleButtonGroup as RaToggleButtonGroup,
  ToggleButtonGroupProps as RaToggleButtonGroupProps,
} from 'react-aria-components';

import { Label } from '../label';

import './ToggleButtonGroup.css';

type ToggleButtonGroupProps = Pick<RaToggleButtonGroupProps, 'children'> & {
  label?: string;
  selectedKeys: Key[];
  onSelectionChange: (newSelection: Key[]) => void;
};

export const ToggleButtonGroup = ({ children, label, ...props }: ToggleButtonGroupProps) => {
  const id = useId();

  return (
    <div className='ecms-toggle-button-group'>
      <Label id={id}>{label}</Label>
      <RaToggleButtonGroup
        {...props}
        selectedKeys={new Set(props.selectedKeys)}
        onSelectionChange={(keys) => props.onSelectionChange(Array.from(keys))}
        aria-labelledby={id}
        disallowEmptySelection
      >
        {children}
      </RaToggleButtonGroup>
    </div>
  );
};
