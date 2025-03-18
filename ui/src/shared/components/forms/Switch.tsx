import { FormGroup, Switch as BlueprintSwitch } from '@blueprintjs/core';

import './Switch.scss';

type SwitchParams = {
    label?: string;
    value: boolean;
    inline?: boolean;
    onValueChange?: (value: boolean) => void;
    className?: string;
};

export const Switch = ({ value, onValueChange, label, inline, className = '' }: SwitchParams) => {
    return (
        <FormGroup label={label} inline={inline} className={`${className} switch-component`}>
            <BlueprintSwitch
                checked={value}
                onChange={(ev) => onValueChange?.(ev.target.checked)}
            />
        </FormGroup>
    );
};
