import { Input as RaInput, InputProps as RaInputProps } from 'react-aria-components';

import './Input.css';

type InputProps = RaInputProps;

export const Input = (props: InputProps) => {
  return <RaInput {...props} className='ecms-input' {...props} />;
};
