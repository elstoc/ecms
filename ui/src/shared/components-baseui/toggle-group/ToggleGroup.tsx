import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';
import cn from 'classnames';
import { ReactNode } from 'react';

import { LabelledField } from '../labelled-field';

import styles from './ToggleGroup.module.css';

type ValueCanEmpty = {
  allowEmpty: true;
  value: string[];
};

type ValueCannotEmpty = {
  allowEmpty?: false;
  value: [string, ...string[]];
};

type ToggleButtonGroupProps = {
  children: ReactNode;
  className?: string;
  label: string;
  onChange: (value: string[]) => void;
  allowMultiple?: boolean;
} & (ValueCanEmpty | ValueCannotEmpty);

export const ToggleGroup = ({
  children,
  className,
  label,
  value,
  onChange,
  allowEmpty,
  allowMultiple,
}: ToggleButtonGroupProps) => {
  const classes = cn(styles.Root, className);

  const onValueChange = (value: string[]) => {
    if (allowEmpty || value.length > 0) {
      onChange(value);
    }
  };

  return (
    <LabelledField label={label} ariaHideLabel>
      <BaseToggleGroup
        className={classes}
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
