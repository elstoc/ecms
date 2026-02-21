import { Field } from '@base-ui/react/field';
import cn from 'classnames';
import { ReactNode } from 'react';

import styles from './LabelledField.module.css';

export type InputWidth = 'sm' | 'md' | 'lg' | 'auto' | 'full';

type LabelledFieldProps = {
  label: string;
  ariaHideLabel?: boolean;
  children: ReactNode;
  htmlFor?: string;
  width: InputWidth;
};

export const LabelledField = ({
  label,
  ariaHideLabel,
  children,
  htmlFor,
  width,
}: LabelledFieldProps) => {
  const rootClasses = cn(
    styles.Root,
    { [styles.WidthSm]: width === 'sm' },
    { [styles.WidthMd]: width === 'md' },
    { [styles.WidthLg]: width === 'lg' },
    { [styles.WidthAuto]: width === 'auto' },
    { [styles.WidthFull]: width === 'full' },
  );

  return (
    <Field.Root className={rootClasses}>
      <Field.Label className={styles.Label} aria-hidden={ariaHideLabel} htmlFor={htmlFor}>
        {label}
      </Field.Label>
      {children}
    </Field.Root>
  );
};
