import { FormGroup, SegmentedControl } from '@blueprintjs/core';

import './SegmentedControlInput.scss';

const UNDEFINED_CODE = 'UNDEFINED_CODE';

type DescribedCode = {
  code?: string;
  description: string;
};

type SegmentedControlInputParams = {
  selectedCode?: string;
  describedCodes: DescribedCode[];
  onChange?: (selectedCode?: string) => void;
  label: string;
  inline?: boolean;
  className?: string;
  disabled?: boolean;
};

export const SegmentedControlInput = ({
  selectedCode,
  onChange,
  label,
  describedCodes,
  inline,
  className = '',
  disabled,
}: SegmentedControlInputParams) => {
  const controlOptions = describedCodes.map((option) => ({
    value: option.code ?? UNDEFINED_CODE,
    label: option.description,
  }));

  return (
    <FormGroup label={label} inline={inline} className={`segmented-control-input ${className}`}>
      <SegmentedControl
        value={selectedCode ?? UNDEFINED_CODE}
        aria-label={label}
        onValueChange={(selectedCode) =>
          onChange?.(selectedCode === UNDEFINED_CODE ? undefined : selectedCode)
        }
        options={controlOptions.map((option) => ({ ...option, disabled }))}
      />
    </FormGroup>
  );
};
