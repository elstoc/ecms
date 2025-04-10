import { FormGroup, InputGroup } from '@blueprintjs/core';

import './NullableStringInput.scss';

type NullableStringInputParams = {
  value?: string;
  onValueChange?: (value?: string) => void;
  label: string;
  inline?: boolean;
  className?: string;
  autoFocus?: boolean;
  onPressEnter?: () => void;
};

export const NullableStringInput = ({
  value,
  onValueChange,
  label,
  inline,
  className = '',
  autoFocus,
  onPressEnter,
}: NullableStringInputParams) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onPressEnter?.();
    }
  };

  return (
    <FormGroup label={label} inline={inline} className={`nullable-string-input ${className}`}>
      <InputGroup
        value={value || ''}
        onValueChange={(value) => onValueChange?.(value || undefined)}
        autoFocus={autoFocus}
        onKeyDown={handleKeyDown}
      />
    </FormGroup>
  );
};
