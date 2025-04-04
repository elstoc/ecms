import { FormGroup, NumericInput } from '@blueprintjs/core';

import './NullableIntInput.scss';

type NullableIntInputParams = {
  value: number | null;
  onValueChange?: (value: number | null) => void;
  label: string;
  placeholder?: string;
  inline?: boolean;
  small?: boolean;
  className?: string;
};

export const NullableIntInput = ({
  value,
  onValueChange,
  label,
  placeholder,
  inline,
  small,
  className = '',
}: NullableIntInputParams) => {
  return (
    <FormGroup label={label} inline={inline} className={`nullable-int-input ${className}`}>
      <NumericInput
        value={value == null ? NumericInput.VALUE_EMPTY : value}
        buttonPosition='none'
        placeholder={placeholder}
        onValueChange={(num, str) =>
          onValueChange?.(str === NumericInput.VALUE_EMPTY ? null : parseInt(str))
        }
        small={small}
      />
    </FormGroup>
  );
};
