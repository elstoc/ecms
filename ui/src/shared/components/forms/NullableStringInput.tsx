import { FormGroup, InputGroup } from '@blueprintjs/core';

import './NullableStringInput.scss';

type NullableStringInputParams = {
    value: string | null;
    onValueChange?: (value: string | null) => void;
    placeholder?: string;
    label: string;
    inline?: boolean;
    small?: boolean;
    className?: string;
};

export const NullableStringInput = ({
    value,
    onValueChange,
    placeholder,
    label,
    inline,
    small,
    className = '',
}: NullableStringInputParams) => {
    return (
        <FormGroup label={label} inline={inline} className={`nullable-string-input ${className}`}>
            <InputGroup
                value={value || ''}
                onValueChange={(value) => onValueChange?.(value === '' ? null : value)}
                placeholder={placeholder}
                small={small}
            />
        </FormGroup>
    );
};
