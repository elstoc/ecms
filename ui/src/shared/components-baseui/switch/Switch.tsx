import { Switch as BaseSwitch } from '@base-ui/react/switch';

import styles from './Switch.module.css';

const { Root, Thumb } = BaseSwitch;

type SwitchProps = {
  label: string;
  checked: boolean;
  onChange: (isChecked: boolean) => void;
};

export const Switch = ({ label, checked, onChange }: SwitchProps) => (
  <label className={styles.Label}>
    <Root className={styles.Switch} checked={checked} onCheckedChange={onChange}>
      <Thumb className={styles.Thumb} />
    </Root>
    {label}
  </label>
);
