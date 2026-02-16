import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import { useId } from 'react';

import { LabelledField } from '../labelled-field';

import { ComboboxPortal } from './ComboboxPortal';

import styles from './Combobox.module.css';

const { Root, Input, Clear, Trigger } = BaseCombobox;

export type Item = {
  value: string;
  label: string;
};

type ComboboxProps = {
  label: string;
  items: Item[];
  emptyMessage: string;
  value: string | null;
  onChange: (newValue: string | null) => void;
};

export const Combobox = ({ label, items, emptyMessage, value, onChange }: ComboboxProps) => {
  const id = useId();
  const itemForValue = items.find((item) => item.value === value) ?? null;

  return (
    <Root
      items={items}
      value={itemForValue}
      onValueChange={(item) => onChange(item?.value ?? null)}
    >
      <LabelledField label={label} htmlFor={id}>
        <div className={styles.InputWrapper}>
          <Input id={id} className={styles.Input} />

          <div className={styles.ActionButtons}>
            <ClearButton />
            <TriggerButton />
          </div>
        </div>
      </LabelledField>

      <ComboboxPortal emptyMessage={emptyMessage} />
    </Root>
  );
};

const ClearButton = () => (
  <Clear className={styles.Clear} aria-label='Clear selection'>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={styles.ClearIcon}
    >
      <path d='M18 6L6 18' />
      <path d='M6 6l12 12' />
    </svg>
  </Clear>
);

const TriggerButton = () => (
  <Trigger className={styles.Trigger} aria-label='Open popup'>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={styles.TriggerIcon}
    >
      <path d='M6 9l6 6 6-6' />
    </svg>
  </Trigger>
);
