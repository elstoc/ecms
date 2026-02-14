import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import * as React from 'react';

import { ComboboxItem } from './ComboboxItem';

import styles from './Combobox.module.css';

export type Item = {
  value: string;
  label: string;
};

type ComboboxProps = {
  label: string;
  items: Item[];
  emptyMessage: string;
};

export const Combobox = ({ label, items, emptyMessage }: ComboboxProps) => {
  const id = React.useId();
  return (
    <BaseCombobox.Root items={items}>
      <div className={styles.Label}>
        <label htmlFor={id}>{label}</label>
        <div className={styles.InputWrapper}>
          <BaseCombobox.Input id={id} className={styles.Input} />
          <div className={styles.ActionButtons}>
            <BaseCombobox.Clear className={styles.Clear} aria-label='Clear selection'>
              <ClearIcon className={styles.ClearIcon} />
            </BaseCombobox.Clear>
            <BaseCombobox.Trigger className={styles.Trigger} aria-label='Open popup'>
              <ChevronDownIcon className={styles.TriggerIcon} />
            </BaseCombobox.Trigger>
          </div>
        </div>
      </div>

      <BaseCombobox.Portal>
        <BaseCombobox.Positioner className={styles.Positioner} sideOffset={4}>
          <BaseCombobox.Popup className={styles.Popup}>
            <BaseCombobox.Empty className={styles.Empty}>{emptyMessage}</BaseCombobox.Empty>
            <BaseCombobox.List className={styles.List}>
              {(item) => <ComboboxItem key={item.value} item={item} />}
            </BaseCombobox.List>
          </BaseCombobox.Popup>
        </BaseCombobox.Positioner>
      </BaseCombobox.Portal>
    </BaseCombobox.Root>
  );
};

function ClearIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <path d='M18 6L6 18' />
      <path d='M6 6l12 12' />
    </svg>
  );
}

function ChevronDownIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <path d='M6 9l6 6 6-6' />
    </svg>
  );
}
