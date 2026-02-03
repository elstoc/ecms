import { Field } from '@base-ui/react/field';
import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';
import { ReactNode } from 'react';

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
  onChange: (value: T[]) => void;
  label: string;
  allowMultiple?: boolean;
} & (ValueCanEmpty<T> | ValueCannotEmpty<T>);

export const ToggleGroup = <T,>({
  label,
  children,
  allowEmpty,
  allowMultiple,
  onChange,
  ...props
}: ToggleButtonGroupProps<T>) => {
  const onValueChange = (value: T[]) => {
    if (allowEmpty || value.length > 0) {
      console.log(value);
      onChange(value);
    }
  };

  return (
    <Field.Root>
      <Field.Label aria-hidden>{label}</Field.Label>
      <BaseToggleGroup
        {...props}
        onValueChange={onValueChange}
        multiple={allowMultiple}
        aria-label={label}
      >
        {children}
      </BaseToggleGroup>
    </Field.Root>
  );
};
