import { Field } from '@base-ui/react/field';
import cn from 'classnames';
import { ReactNode } from 'react';

import styles from './LabelledField.module.css';

export type InputWidth = 'sm' | 'md' | 'lg' | 'full' | 'fitContent';

type LabelledFieldProps = {
  label: string;
  ariaHideLabel?: boolean;
  children: ReactNode;
  htmlFor?: string;
  width: InputWidth;
  disabled?: boolean;
  horizontal?: boolean;
};

export const LabelledField = ({
  label,
  ariaHideLabel,
  children,
  htmlFor,
  width,
  disabled,
  horizontal,
}: LabelledFieldProps) => {
  const rootClasses = cn(
    styles.Root,
    { [styles.WidthSm]: width === 'sm' },
    { [styles.WidthMd]: width === 'md' },
    { [styles.WidthLg]: width === 'lg' },
    { [styles.WidthFit]: width === 'fitContent' },
    { [styles.WidthFull]: width === 'full' },
    { [styles.Horizontal]: horizontal },
  );

  return (
    <Field.Root className={rootClasses} disabled={disabled}>
      <Field.Label className={styles.Label} aria-hidden={ariaHideLabel} htmlFor={htmlFor}>
        {label}
      </Field.Label>
      {children}
    </Field.Root>
  );
};
