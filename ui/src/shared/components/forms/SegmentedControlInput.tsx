import { FormGroup, SegmentedControl } from '@blueprintjs/core';

import './SegmentedControlInput.scss';

const UNDEFINED_KEY = 'UNDEFINED_KEY';

type SegmentedControlOption = {
  key?: string;
  value: string;
};

type SegmentedControlInputParams = {
  selectedKey?: string;
  options: SegmentedControlOption[];
  onChange?: (key?: string) => void;
  label: string;
  inline?: boolean;
  className?: string;
};

export const SegmentedControlInput = ({
  selectedKey,
  onChange,
  label,
  options,
  inline,
  className = '',
}: SegmentedControlInputParams) => {
  const controlOptions = options.map((option) => ({
    value: option.key ?? UNDEFINED_KEY,
    label: option.value,
  }));

  return (
    <FormGroup label={label} inline={inline} className={`segmented-control-input ${className}`}>
      <SegmentedControl
        value={selectedKey ?? UNDEFINED_KEY}
        onValueChange={(key) => onChange?.(key === UNDEFINED_KEY ? undefined : key)}
        options={controlOptions}
      />
    </FormGroup>
  );
};
