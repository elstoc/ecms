import { FormGroup, NumericInput } from '@blueprintjs/core';

import './IntegerInput.scss';

type IntegerInputParams = {
  value?: number;
  onValueChange?: (value?: number) => void;
  label: string;
  inline?: boolean;
  className?: string;
};

export const IntegerInput = ({
  value,
  onValueChange,
  label,
  inline,
  className = '',
}: IntegerInputParams) => {
  return (
    <FormGroup label={label} inline={inline} className={`nullable-int-input ${className}`}>
      <NumericInput
        value={value == null ? NumericInput.VALUE_EMPTY : value}
        buttonPosition='none'
        onValueChange={(num, str) =>
          onValueChange?.(str === NumericInput.VALUE_EMPTY ? undefined : parseInt(str))
        }
        size='small'
      />
    </FormGroup>
  );
};
