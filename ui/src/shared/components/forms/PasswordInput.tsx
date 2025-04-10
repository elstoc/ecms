import { Button, FormGroup, InputGroup, Intent, Tooltip } from '@blueprintjs/core';
import { useState } from 'react';

import './PasswordInput.scss';

type PasswordInputParams = {
  value: string;
  onValueChange?: (value: string) => void;
  label: string;
  inline?: boolean;
  className?: string;
  onPressEnter?: () => void;
};

export const PasswordInput = ({
  value,
  onValueChange,
  label,
  inline,
  className = '',
  onPressEnter,
}: PasswordInputParams) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onPressEnter?.();
    }
  };

  const lockButton = (
    <Tooltip content={`${showPassword ? 'Hide' : 'Show'} Password`} position='right'>
      <Button
        icon={showPassword ? 'unlock' : 'lock'}
        intent={Intent.WARNING}
        variant='minimal'
        onClick={() => setShowPassword((shown) => !shown)}
      />
    </Tooltip>
  );

  return (
    <FormGroup label={label} inline={inline} className={`password-input ${className}`}>
      <InputGroup
        value={value}
        onValueChange={(value) => onValueChange?.(value)}
        rightElement={lockButton}
        type={showPassword ? 'text' : 'password'}
        onKeyDown={handleKeyDown}
      />
    </FormGroup>
  );
};
