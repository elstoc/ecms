import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';
import cn from 'classnames';

import { LabelledField } from '../labelled-field';
import { Toggle } from '../toggle';

import styles from './ToggleGroup.module.css';

type Item = {
  value: string;
  label: string;
};

type ValueCanEmpty = {
  allowEmpty: true;
  value: string[];
};

type ValueCannotEmpty = {
  allowEmpty?: false;
  value: [string, ...string[]];
};

type ToggleButtonGroupProps = {
  className?: string;
  label: string;
  onChange: (value: string[]) => void;
  allowMultiple?: boolean;
  items: Item[];
} & (ValueCanEmpty | ValueCannotEmpty);

export const ToggleGroup = ({
  className,
  label,
  value,
  onChange,
  allowEmpty,
  allowMultiple,
  items,
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
        {items.map((item) => (
          <Toggle key={item.value} value={item.value}>
            {item.label}
          </Toggle>
        ))}
      </BaseToggleGroup>
    </LabelledField>
  );
};
