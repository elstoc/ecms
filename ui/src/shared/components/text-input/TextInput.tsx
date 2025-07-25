import {
  Input as RaInput,
  InputProps as RaInputProps,
  Label as RaLabel,
  LabelProps as RaLabelProps,
  TextField as RaTextField,
  TextFieldProps as RaTextFieldProps,
} from 'react-aria-components';

import './TextInput.css';

type LabelProps = RaLabelProps;

export const Label = (props: LabelProps) => {
  return <RaLabel className='ecms-label' {...props} />;
};

type InputProps = RaInputProps;

export const Input = (props: InputProps) => {
  return <RaInput {...props} className='ecms-input' {...props} />;
};

type TextInputProps = RaTextFieldProps & {
  value?: string;
  onChange?: (value: string) => void;
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
