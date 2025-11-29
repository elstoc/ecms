import cn from 'classnames';
import { NumberField, NumberFieldProps } from 'react-aria-components';

import { Input } from '../input';
import { Label } from '../label';

import './NumberInput.css';

type NumberInputProps = Pick<NumberFieldProps, 'value' | 'onChange' | 'className' | 'step'> & {
  label?: string;
};

export const NumberInput = ({ value, label, ...props }: NumberInputProps) => {
  const className = cn('ecms-number-input', props.className);

  return (
    <NumberField {...props} value={value ?? 0} className={className}>
      <Label>{label}</Label>
      <Input />
    </NumberField>
  );
};
