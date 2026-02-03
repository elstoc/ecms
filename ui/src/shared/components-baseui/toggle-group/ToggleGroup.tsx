import { Field } from '@base-ui/react/field';
import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';
import cn from 'classnames';
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

  const classes = cn(className, 'ec-toggle-group');
  return (
    <Field.Root className={classes}>
      <Field.Label aria-hidden>{label}</Field.Label>
      <BaseToggleGroup
        value={value}
        onValueChange={onValueChange}
        multiple={allowMultiple}
        aria-label={label}
      >
        {children}
      </BaseToggleGroup>
    </Field.Root>
  );
};
