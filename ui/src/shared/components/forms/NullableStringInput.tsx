import { FormGroup, InputGroup } from '@blueprintjs/core';

import './NullableStringInput.scss';

type NullableStringInputParams = {
  value?: string;
  onValueChange?: (value?: string) => void;
  placeholder?: string;
  label: string;
  inline?: boolean;
  className?: string;
};

export const NullableStringInput = ({
  value,
  onValueChange,
  placeholder,
  label,
  inline,
  className = '',
}: NullableStringInputParams) => {
  return (
    <FormGroup label={label} inline={inline} className={`nullable-string-input ${className}`}>
      <InputGroup
        value={value || ''}
        onValueChange={(value) => onValueChange?.(value || undefined)}
        placeholder={placeholder}
      />
    </FormGroup>
  );
};
