import {
  TextField as RaTextField,
  TextFieldProps as RaTextFieldProps,
} from 'react-aria-components';

import { Input } from '../input';
import { Label } from '../label';

import './TextInput.css';

type TextInputProps = Pick<RaTextFieldProps, 'value' | 'onChange'> & {
  label: string;
};

export const TextInput = ({ value, onChange, label, ...rest }: TextInputProps) => {
  return (
    <RaTextField {...rest} className='ecms-text-input' value={value ?? ''} onChange={onChange}>
      <Label>{label}</Label>
      <Input />
    </RaTextField>
  );
};
