import { FormGroup, NumericInput } from '@blueprintjs/core';

import './IntegerInput.scss';

type IntegerInputParams = {
  value?: number;
  onChange?: (value?: number) => void;
  label: string;
  inline?: boolean;
  className?: string;
};

export const IntegerInput = ({
  value,
  onChange,
  label,
  inline,
  className = '',
}: IntegerInputParams) => {
  return (
    <FormGroup label={label} inline={inline} className={`integer-input ${className}`}>
      <NumericInput
        value={value == null ? NumericInput.VALUE_EMPTY : value}
        buttonPosition='none'
        onValueChange={(num, str) =>
          onChange?.(str === NumericInput.VALUE_EMPTY ? undefined : parseInt(str))
        }
      />
    </FormGroup>
  );
};
