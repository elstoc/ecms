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
          <Value />

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
  <Icon className={styles.SelectIconContainer}>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={styles.SelectIcon}
    >
      <path d='M6 9l6 6 6-6' />
    </svg>
  </Icon>
);
