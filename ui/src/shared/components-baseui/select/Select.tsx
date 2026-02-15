import { Select as BaseSelect } from '@base-ui/react/select';
import { useId } from 'react';

import { LabelledField } from '../labelled-field';

import { SelectItem } from './SelectItem';

import styles from './Select.module.css';

const { Root, Trigger, Value, Portal, Positioner, Popup, List, Icon } = BaseSelect;

export type Item = {
  value: string;
  label: string;
};

type SelectProps = {
  label: string;
  value: string | null;
  onChange: (newValue: string | null) => void;
  items: Item[];
};

export const Select = ({ value, label, items, onChange }: SelectProps) => {
  const id = useId();

  return (
    <LabelledField label={label} htmlFor={id}>
      <Root id={id} items={items} value={value} onValueChange={onChange}>
        <Trigger className={styles.Trigger}>
          <Value className={styles.Value} />

          <SelectIcon />
        </Trigger>

        <Portal>
          <Positioner className={styles.Positioner} alignItemWithTrigger={false} sideOffset={5}>
            <Popup className={styles.Popup}>
              <List className={styles.List}>
                {items.map((item) => (
                  <SelectItem key={item.value} item={item} />
                ))}
              </List>
            </Popup>
          </Positioner>
        </Portal>
      </Root>
    </LabelledField>
  );
};

const SelectIcon = () => (
  <Icon className={styles.SelectIcon}>
    <svg
      width='8'
      height='12'
      viewBox='0 0 8 12'
      fill='none'
      stroke='currentcolor'
      strokeWidth='1.5'
      className={styles.SelectIcon}
    >
      <path d='M0.5 4.5L4 1.5L7.5 4.5' />
      <path d='M0.5 7.5L4 10.5L7.5 7.5' />
    </svg>
  </Icon>
);
