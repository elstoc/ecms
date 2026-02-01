import { Switch as BlueprintSwitch, FormGroup } from '@blueprintjs/core';

import './Switch.scss';

type SwitchParams = {
  label?: string;
  value: boolean;
  onChange?: (value: boolean) => void;
  inline?: boolean;
  className?: string;
  disabled?: boolean;
};

export const Switch = ({
  value,
  onChange,
  label,
  inline,
  className = '',
  disabled,
}: SwitchParams) => {
  return (
    <FormGroup label={label} inline={inline} className={`${className} switch-component`}>
      <BlueprintSwitch
        disabled={disabled}
        checked={value}
        onChange={(ev) => onChange?.(ev.target.checked)}
      />
    </FormGroup>
  );
};
