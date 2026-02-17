import { Field } from '@base-ui/react/field';
import { ReactNode } from 'react';

import styles from './LabelledField.module.css';

type LabelledFieldProps = {
  label: string;
  ariaHideLabel?: boolean;
  children: ReactNode;
  htmlFor?: string;
};

export const LabelledField = ({ label, ariaHideLabel, children, htmlFor }: LabelledFieldProps) => {
  return (
    <Field.Root className={styles.Root}>
      <Field.Label className={styles.Label} aria-hidden={ariaHideLabel} htmlFor={htmlFor}>
        {label}
      </Field.Label>
      {children}
    </Field.Root>
  );
};
