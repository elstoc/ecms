import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';
import { ReactNode } from 'react';

import { LabelledField } from '../labelled-field';

import './ToggleGroup.css';

type ValueCanEmpty<T> = {
  allowEmpty: true;
  value: T[];
};

type ValueCannotEmpty<T> = {
  allowEmpty?: false;
  value: [T, ...T[]];
};

type ToggleButtonGroupProps<T> = {
  children: ReactNode;
  className?: string;
  label: string;
  onChange: (value: T[]) => void;
  allowMultiple?: boolean;
} & (ValueCanEmpty<T> | ValueCannotEmpty<T>);

export const ToggleGroup = <T,>({
  children,
  className,
  label,
  value,
  onChange,
  allowEmpty,
  allowMultiple,
}: ToggleButtonGroupProps<T>) => {
  const onValueChange = (value: T[]) => {
    if (allowEmpty || value.length > 0) {
      onChange(value);
    }
  };

  return (
    <LabelledField label={label} ariaHideLabel>
      <BaseToggleGroup
        className={className}
        value={value}
        onValueChange={onValueChange}
        multiple={allowMultiple}
        aria-label={label}
      >
        {children}
      </BaseToggleGroup>
    </LabelledField>
  );
};
