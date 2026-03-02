import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import { useCallback, useEffect, useId, useState } from 'react';

import { InputWidth, LabelledField } from '../labelled-field';

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
  width?: InputWidth;
  maxListItems?: number;
  disabled?: boolean;
};

/* this generator function should be more efficient than an array filter
   for short search terms because it stops filtering after reaching maxLength */
function* limitedItemFilter(items: Item[], maxLength: number, searchTerm: string) {
  let count = 0;
  let i = 0;
  while (count < maxLength && i < items.length) {
    if (items[i].label.toLowerCase().includes(searchTerm.toLowerCase())) {
      yield items[i];
      count++;
    }

    i++;
  }
}

export const Combobox = ({
  label,
  items,
  emptyMessage,
  value,
  onChange,
  width = 'md',
  maxListItems,
  disabled,
}: ComboboxProps) => {
  const id = useId();
  const selectedItem = items.find((item) => item.value === value) ?? null;
  const [query, setQuery] = useState('');
  const [displayedItems, setDisplayedItems] = useState(
    maxListItems ? items.slice(0, maxListItems) : items,
  );

  const updateDisplayedItems = useCallback(
    (searchTerm: string) => {
      if (maxListItems && items.length > maxListItems) {
        if (!searchTerm) {
          setDisplayedItems(items.slice(0, maxListItems));
        }

        setDisplayedItems([...limitedItemFilter(items, maxListItems, searchTerm)]);
      }
    },
    [items, maxListItems],
  );

  const onValueChange = (
    newItem: Item | null,
    eventDetails: BaseCombobox.Root.ChangeEventDetails,
  ) => {
    /* prevent deselection of item with the escape key */
    if (eventDetails.reason !== 'escape-key') {
      onChange(newItem?.value ?? null);
    }
  };

  useEffect(() => {
    const newQuery = selectedItem?.label ?? '';
    setQuery(newQuery);
    updateDisplayedItems(newQuery);
  }, [selectedItem, updateDisplayedItems]);

  return (
    <Root
      items={displayedItems}
      value={selectedItem}
      inputValue={query}
      onValueChange={onValueChange}
      onOpenChangeComplete={(open) => {
        if (!open && selectedItem) {
          updateDisplayedItems(selectedItem.label);
        }
      }}
      onInputValueChange={(nextInputValue, { reason }) => {
        if (reason !== 'item-press') {
          updateDisplayedItems(nextInputValue);
        }
        if (reason !== 'escape-key') {
          setQuery(nextInputValue);
        }
      }}
    >
      <LabelledField label={label} htmlFor={id} width={width} disabled={disabled}>
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
