import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import { useId, useRef } from 'react';

import { ComboboxPortal } from '../combobox/ComboboxPortal';
import { LabelledField } from '../labelled-field';

import styles from './TagSelect.module.css';

const { Root, Chips, Value, Chip, Input, ChipRemove } = BaseCombobox;

export type Item = {
  value: string;
  label: string;
};

type TagSelectProps = {
  items: Item[];
  label: string;
  value: string[];
  onChange: (newValue: string[]) => void;
  emptyMessage: string;
};

export const TagSelect = ({ items, label, emptyMessage, value, onChange }: TagSelectProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const id = useId();

  const itemsForValue = items.filter((item) => value.includes(item.value));
  const onValueChange = (newItems: Item[]) => {
    onChange(newItems.map((item) => item.value));
  };

  return (
    <Root items={items} multiple value={itemsForValue} onValueChange={onValueChange}>
      <LabelledField label={label} htmlFor={id}>
        <div className={styles.InputContainer}>
          <Chips className={styles.Chips} ref={containerRef}>
            <Value>
              {(items: Item[]) => (
                <>
                  {items.map((item) => (
                    <Chip key={item.value} className={styles.Chip} aria-label={item.label}>
                      {item.label}

                      <ChipRemoveButton />
                    </Chip>
                  ))}
                  <Input id={id} className={styles.Input} />
                </>
              )}
            </Value>
          </Chips>
        </div>
      </LabelledField>

      <ComboboxPortal emptyMessage={emptyMessage} positionerAnchor={containerRef} />
    </Root>
  );
};

const ChipRemoveButton = () => (
  <ChipRemove className={styles.ChipRemove} aria-label='Remove'>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={16}
      height={16}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden
    >
      <path d='M18 6 6 18' />
      <path d='m6 6 12 12' />
    </svg>
  </ChipRemove>
);
