import { Input as BaseInput } from '@base-ui/react/input';
import { useId } from 'react';

import { InputWidth, LabelledField } from '../labelled-field';

import styles from './Input.module.css';

type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
  type?: 'text' | 'password';
  width?: InputWidth;
  onPressEnter?: () => void;
  disabled?: boolean;
};

export const Input = ({
  label,
  value,
  onChange,
  autoFocus,
  type,
  width = 'md',
  onPressEnter,
  disabled,
}: InputProps) => {
  const id = useId();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onPressEnter?.();
    }
  };

  return (
    <LabelledField label={label} width={width} disabled={disabled} htmlFor={id}>
      <BaseInput
        id={id}
        className={styles.Root}
        value={value}
        onValueChange={onChange}
        autoFocus={autoFocus}
        type={type}
        onKeyDown={handleKeyDown}
      />
    </LabelledField>
  );
};
