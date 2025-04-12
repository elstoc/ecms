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
};

export const SegmentedControlInput = ({
  selectedCode,
  onChange,
  label,
  describedCodes,
  inline,
  className = '',
}: SegmentedControlInputParams) => {
  const controlOptions = describedCodes.map((option) => ({
    value: option.code ?? UNDEFINED_CODE,
    label: option.description,
  }));

  return (
    <FormGroup label={label} inline={inline} className={`segmented-control-input ${className}`}>
      <SegmentedControl
        value={selectedCode ?? UNDEFINED_CODE}
        onValueChange={(selectedCode) =>
          onChange?.(selectedCode === UNDEFINED_CODE ? undefined : selectedCode)
        }
        options={controlOptions}
      />
    </FormGroup>
  );
};
