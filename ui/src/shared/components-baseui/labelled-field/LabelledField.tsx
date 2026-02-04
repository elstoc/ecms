import { Field } from '@base-ui/react/field';
import { ReactNode } from 'react';

import './LabelledField.css';

type LabelledFieldProps = {
  label: string;
  ariaHideLabel?: boolean;
  children: ReactNode;
};

export const LabelledField = ({ label, ariaHideLabel, children }: LabelledFieldProps) => {
  return (
    <Field.Root className='ec-labelled-field'>
      <Field.Label className='ec-field-label' aria-hidden={ariaHideLabel}>
        {label}
      </Field.Label>
      {children}
    </Field.Root>
  );
};
