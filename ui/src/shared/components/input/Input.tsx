import { Input as BaseInput } from '@base-ui/react/input';

import { InputWidth, LabelledField } from '../labelled-field';

import styles from './Input.module.css';

type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
  type?: 'text' | 'password';
  width?: InputWidth;
};

export const Input = ({ label, value, onChange, autoFocus, type, width = 'md' }: InputProps) => {
  return (
    <LabelledField label={label} width={width}>
      <BaseInput
        className={styles.Root}
        value={value}
        onValueChange={onChange}
        autoFocus={autoFocus}
        type={type}
      />
    </LabelledField>
  );
};
