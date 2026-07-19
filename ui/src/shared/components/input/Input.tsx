import { Input as BaseInput } from '@base-ui/react/input';
import cn from 'classnames';
import { useId } from 'react';

import { useDebouncedInput } from '@/shared/hooks';

import { InputWidth, LabelledField } from '../labelled-field';

import * as styles from './Input.module.css';

type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
  type?: 'text' | 'password';
  width?: InputWidth;
  onPressEnter?: () => void;
  disabled?: boolean;
  variant?: 'text' | 'textarea';
  debounceTimeout?: number;
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
  variant = 'text',
  debounceTimeout,
}: InputProps) => {
  const id = useId();

  const { debouncedValue, debouncedOnChange } = useDebouncedInput(value, onChange, debounceTimeout);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onPressEnter?.();
    }
  };

  return (
    <LabelledField label={label} width={width} disabled={disabled} htmlFor={id}>
      <BaseInput
        id={id}
        className={cn(styles.Root, {
          [styles.VariantText]: variant === 'text',
          [styles.VariantTextArea]: variant === 'textarea',
        })}
        value={debouncedValue}
        onValueChange={debouncedOnChange}
        autoFocus={autoFocus}
        type={type}
        onKeyDown={handleKeyDown}
        render={variant == 'textarea' ? <textarea /> : undefined}
      />
    </LabelledField>
  );
};
