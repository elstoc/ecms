import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import { useId } from 'react';

import { InputWidth, LabelledField } from '../labelled-field';

import styles from './NumberInput.module.css';

const { Root, Input } = BaseNumberField;

type InputProps = {
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  maximumFractionDigits?: number;
  width?: InputWidth;
};

export const NumberInput = ({
  label,
  value,
  onChange,
  maximumFractionDigits,
  width = 'md',
}: InputProps) => {
  const id = useId();

  return (
    <LabelledField label={label} htmlFor={id} width={width}>
      <Root value={value} onValueChange={onChange} format={{ maximumFractionDigits }}>
        <Input className={styles.Input} />
      </Root>
    </LabelledField>
  );
};
