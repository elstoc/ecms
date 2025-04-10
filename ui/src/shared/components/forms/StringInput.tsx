import { FormGroup, InputGroup } from '@blueprintjs/core';

import './StringInput.scss';

type StringInputParams = {
  value: string;
  onValueChange?: (value: string) => void;
  label: string;
  inline?: boolean;
  className?: string;
  autoFocus?: boolean;
  onPressEnter?: () => void;
};

export const StringInput = ({
  value,
  onValueChange,
  label,
  inline,
  className = '',
  autoFocus,
  onPressEnter,
}: StringInputParams) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onPressEnter?.();
    }
  };

  return (
    <FormGroup label={label} inline={inline} className={`string-input ${className}`}>
      <InputGroup
        value={value}
        onValueChange={(value) => onValueChange?.(value)}
        autoFocus={autoFocus}
        onKeyDown={handleKeyDown}
      />
    </FormGroup>
  );
};
