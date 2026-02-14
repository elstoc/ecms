import { Select as BaseSelect } from '@base-ui/react/select';
import { useId } from 'react';

import { LabelledField } from '../labelled-field';

import { SelectItem } from './SelectItem';

import styles from './Select.module.css';

export type Item = {
  value: string;
  label: string;
};

type SelectProps = {
  label: string;
  value: Item | null;
  onChange: (newValue: Item | null) => void;
  items: Item[];
};

export const Select = ({ value, label, items, onChange }: SelectProps) => {
  const id = useId();
  return (
    <LabelledField label={label} htmlFor={id}>
      <BaseSelect.Root id={id} items={items} value={value} onValueChange={onChange}>
        <BaseSelect.Trigger className={styles.Trigger}>
          <BaseSelect.Value className={styles.Value} placeholder='-' />
          <BaseSelect.Icon className={styles.SelectIcon}>
            <ChevronUpDownIcon />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>

        <BaseSelect.Portal>
          <BaseSelect.Positioner
            className={styles.Positioner}
            alignItemWithTrigger={false}
            sideOffset={5}
          >
            <BaseSelect.Popup className={styles.Popup}>
              <BaseSelect.List className={styles.List}>
                {items.map((item) => (
                  <SelectItem key={item.value} item={item} />
                ))}
              </BaseSelect.List>
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </BaseSelect.Root>
    </LabelledField>
  );
};

const ChevronUpDownIcon = (props: React.ComponentProps<'svg'>) => {
  return (
    <svg
      width='8'
      height='12'
      viewBox='0 0 8 12'
      fill='none'
      stroke='currentcolor'
      strokeWidth='1.5'
      {...props}
    >
      <path d='M0.5 4.5L4 1.5L7.5 4.5' />
      <path d='M0.5 7.5L4 10.5L7.5 7.5' />
    </svg>
  );
};
