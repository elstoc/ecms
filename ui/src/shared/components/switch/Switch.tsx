import { Switch as BaseSwitch } from '@base-ui/react/switch';
import { useId } from 'react';

import { InputWidth, LabelledField } from '../labelled-field';

import styles from './Switch.module.css';

const { Root, Thumb } = BaseSwitch;

type SwitchProps = {
  label: string;
  checked: boolean;
  onChange: (isChecked: boolean) => void;
  disabled?: boolean;
  width?: InputWidth;
};

export const Switch = ({ label, checked, onChange, disabled, width = 'md' }: SwitchProps) => {
  const id = useId();

  return (
    <LabelledField label={label} htmlFor={id} width={width} disabled={disabled} horizontal>
      <Root
        id={id}
        className={styles.Switch}
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
      >
        <Thumb className={styles.Thumb} />
      </Root>
    </LabelledField>
  );
};
