import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import * as React from 'react';

import { ComboboxItem } from './ComboboxItem';

import styles from './Combobox.module.css';

export const Combobox = () => {
  const id = React.useId();
  return (
    <BaseCombobox.Root items={fruits}>
      <div className={styles.Label}>
        <label htmlFor={id}>Choose a fruit</label>
        <div className={styles.InputWrapper}>
          <BaseCombobox.Input placeholder='e.g. Apple' id={id} className={styles.Input} />
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
            <BaseCombobox.Empty className={styles.Empty}>No fruits found.</BaseCombobox.Empty>
            <BaseCombobox.List className={styles.List}>
              {(item: Fruit) => <ComboboxItem key={item.value} item={item} />}
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

interface Fruit {
  label: string;
  value: string;
}

const fruits: Fruit[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
  { label: 'Pineapple', value: 'pineapple' },
  { label: 'Grape', value: 'grape' },
  { label: 'Mango', value: 'mango' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Raspberry', value: 'raspberry' },
  { label: 'Blackberry', value: 'blackberry' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Peach', value: 'peach' },
  { label: 'Pear', value: 'pear' },
  { label: 'Plum', value: 'plum' },
  { label: 'Kiwi', value: 'kiwi' },
  { label: 'Watermelon', value: 'watermelon' },
  { label: 'Cantaloupe', value: 'cantaloupe' },
  { label: 'Honeydew', value: 'honeydew' },
  { label: 'Papaya', value: 'papaya' },
  { label: 'Guava', value: 'guava' },
  { label: 'Lychee', value: 'lychee' },
  { label: 'Pomegranate', value: 'pomegranate' },
  { label: 'Apricot', value: 'apricot' },
  { label: 'Grapefruit', value: 'grapefruit' },
  { label: 'Passionfruit', value: 'passionfruit' },
];
