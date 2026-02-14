import { Field } from '@base-ui/react/field';
import { ReactNode } from 'react';

import './LabelledField.css';

type LabelledFieldProps = {
  label: string;
  ariaHideLabel?: boolean;
  children: ReactNode;
  htmlFor?: string;
};

export const LabelledField = ({ label, ariaHideLabel, children, htmlFor }: LabelledFieldProps) => {
  return (
    <Field.Root className='ec-labelled-field'>
      <Field.Label className='ec-field-label' aria-hidden={ariaHideLabel} htmlFor={htmlFor}>
        {label}
      </Field.Label>
      {children}
    </Field.Root>
  );
};
