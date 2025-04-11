import { FormGroup, OptionProps, SegmentedControl } from '@blueprintjs/core';

import './SegmentedControlInput.scss';

type SegmentedControlInputParams = {
  value: string;
  options: OptionProps<string>[];
  onValueChange?: (value: string) => void;
  label: string;
  inline?: boolean;
  className?: string;
};

export const SegmentedControlInput = ({
  value,
  onValueChange,
  label,
  options,
  inline,
  className = '',
}: SegmentedControlInputParams) => {
  return (
    <FormGroup label={label} inline={inline} className={`segmented-control-input ${className}`}>
      <SegmentedControl
        value={value}
        onValueChange={(value) => onValueChange?.(value)}
        options={options}
      />
    </FormGroup>
  );
};
