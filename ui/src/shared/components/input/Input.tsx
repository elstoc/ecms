import { Input as BaseInput } from '@base-ui/react/input';

import { LabelledField } from '../labelled-field';

import styles from './Input.module.css';

type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
  type?: 'text' | 'password';
};

export const Input = ({ label, value, onChange, autoFocus, type }: InputProps) => {
  return (
    <LabelledField label={label}>
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
