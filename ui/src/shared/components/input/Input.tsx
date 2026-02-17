import { Input as BaseInput } from '@base-ui/react/input';

import { LabelledField } from '../labelled-field';

import styles from './Input.module.css';

type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export const Input = ({ label, value, onChange }: InputProps) => {
  return (
    <LabelledField label={label}>
      <BaseInput className={styles.Root} value={value} onValueChange={onChange} />
    </LabelledField>
  );
};
