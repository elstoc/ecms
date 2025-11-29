import cn from 'classnames';
import {
  TextField as RaTextField,
  TextFieldProps as RaTextFieldProps,
} from 'react-aria-components';

import { Input } from '../input';
import { Label } from '../label';

import './TextInput.css';

type TextInputProps = Pick<RaTextFieldProps, 'value' | 'onChange' | 'className'> & {
  label: string;
};

export const TextInput = ({ onChange, value, className, label, ...rest }: TextInputProps) => {
  const classNames = cn('ecms-text-input', className);

  return (
    <RaTextField {...rest} className={classNames} value={value ?? ''} onChange={onChange}>
      <Label>{label}</Label>
      <Input />
    </RaTextField>
  );
};
