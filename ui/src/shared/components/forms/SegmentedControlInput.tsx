import { FormGroup, OptionProps, SegmentedControl } from '@blueprintjs/core';

import './SegmentedControlInput.scss';

type SegmentedControlInputParams = {
  value: string;
  options: OptionProps<string>[];
  onValueChange?: (value: string) => void;
  label: string;
  inline?: boolean;
  small?: boolean;
  className?: string;
};

export const SegmentedControlInput = ({
  value,
  onValueChange,
  label,
  options,
  inline,
  small,
  className = '',
}: SegmentedControlInputParams) => {
  return (
    <FormGroup label={label} inline={inline} className={`segmented-control-input ${className}`}>
      <SegmentedControl
        value={value}
        onValueChange={(value) => onValueChange?.(value)}
        small={small}
        options={options}
      />
    </FormGroup>
  );
};
