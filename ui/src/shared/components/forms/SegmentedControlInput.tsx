import { FormGroup, SegmentedControl } from '@blueprintjs/core';

import './SegmentedControlInput.scss';

const UNDEFINED_CODE = 'UNDEFINED_CODE';

type SegmentedControlOption = {
  code?: string;
  description: string;
};

type SegmentedControlInputParams = {
  selectedCode?: string;
  options: SegmentedControlOption[];
  onChange?: (selectedCode?: string) => void;
  label: string;
  inline?: boolean;
  className?: string;
};

export const SegmentedControlInput = ({
  selectedCode,
  onChange,
  label,
  options,
  inline,
  className = '',
}: SegmentedControlInputParams) => {
  const controlOptions = options.map((option) => ({
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
