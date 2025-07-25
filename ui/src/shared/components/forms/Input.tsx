import { FormGroup, InputGroup } from '@blueprintjs/core';

import './Input.scss';

type InputParams = {
  value?: string;
  onChange?: (value?: string) => void;
  label: string;
  inline?: boolean;
  className?: string;
  autoFocus?: boolean;
  onPressEnter?: () => void;
  disabled?: boolean;
  type?: string;
};

export const Input = ({
  value,
  onChange,
  label,
  inline,
  className = '',
  autoFocus,
  onPressEnter,
  disabled,
  type,
}: InputParams) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onPressEnter?.();
    }
  };

  return (
    <FormGroup label={label} inline={inline} className={`string-input ${className}`}>
      <InputGroup
        value={value || ''}
        onValueChange={(value) => onChange?.(value || undefined)}
        autoFocus={autoFocus}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        type={type}
      />
    </FormGroup>
  );
};
