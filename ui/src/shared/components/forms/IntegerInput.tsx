import { FormGroup, NumericInput } from '@blueprintjs/core';

import './IntegerInput.scss';

type IntegerInputParams = {
  value?: number;
  onChange?: (value?: number) => void;
  label: string;
  inline?: boolean;
  className?: string;
  disabled?: boolean;
};

export const IntegerInput = ({
  value,
  onChange,
  label,
  inline,
  className = '',
  disabled,
}: IntegerInputParams) => {
  return (
    <FormGroup label={label} inline={inline} className={`integer-input ${className}`}>
      <NumericInput
        value={value == null ? NumericInput.VALUE_EMPTY : value}
        disabled={disabled}
        buttonPosition='none'
        onValueChange={(num, str) =>
          onChange?.(str === NumericInput.VALUE_EMPTY ? undefined : parseInt(str))
        }
      />
    </FormGroup>
  );
};
