import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import { useId } from 'react';

import { useDebouncedInput } from '@/shared/hooks';

import { InputWidth, LabelledField } from '../labelled-field';

import * as styles from './NumberInput.module.css';

const { Root, Input } = BaseNumberField;

type InputProps = {
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  maximumFractionDigits?: number;
  width?: InputWidth;
  disabled?: boolean;
  debounceTimeout?: number;
};

export const NumberInput = ({
  label,
  value,
  onChange,
  maximumFractionDigits,
  width = 'md',
  disabled,
  debounceTimeout,
}: InputProps) => {
  const id = useId();
  const { debouncedValue, debouncedOnChange } = useDebouncedInput(value, onChange, debounceTimeout);

  return (
    <LabelledField label={label} htmlFor={id} width={width} disabled={disabled}>
      <Root
        id={id}
        value={debouncedValue}
        onValueChange={debouncedOnChange}
        format={{ maximumFractionDigits, useGrouping: false }}
      >
        <Input className={styles.Input} />
      </Root>
    </LabelledField>
  );
};
