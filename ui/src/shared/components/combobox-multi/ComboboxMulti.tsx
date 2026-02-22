import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import { useId, useRef, useState } from 'react';

import { ComboboxPortal } from '../combobox';
import { InputWidth, LabelledField } from '../labelled-field';

import styles from './ComboboxMulti.module.css';

const { Root, Chips, Value, Chip, Input, ChipRemove } = BaseCombobox;

export type Item = {
  value: string;
  label: string;
};

type ComboboxMultiProps = {
  label: string;
  items: Item[];
  value: string[];
  onChange: (newValue: string[]) => void;
  emptyMessage: string;
  width?: InputWidth;
  inputValue?: string;
  onInputValueChange?: (inputValue: string) => void;
};

export const ComboboxMulti = ({
  items,
  label,
  emptyMessage,
  value,
  onChange,
  width = 'md',
  inputValue,
  onInputValueChange,
}: ComboboxMultiProps) => {
  const id = useId();
  const [localQueryState, setLocalQueryState] = useState('');
  const containerRef = useRef<HTMLDivElement | null>(null);

  const inputValueStateOrProp = inputValue ?? localQueryState;
  const updateInputValueStateOrProp = onInputValueChange ?? setLocalQueryState;

  const selectedItems = items.filter((item) => value.includes(item.value));

  const onValueChange = (
    newSelectedTagItems: Item[],
    eventDetails: BaseCombobox.Root.ChangeEventDetails,
  ) => {
    if (eventDetails.reason !== 'escape-key') {
      /* prevent deletion of all selected tags with the escape key */
      onChange(newSelectedTagItems.map((item) => item.value));
    }

    if (inputValueStateOrProp) {
      /* clear query if new item has been added */
      const isSelectedItemSameAsQuery = Boolean(
        newSelectedTagItems.find((item) => item.label === inputValueStateOrProp),
      );

      if (isSelectedItemSameAsQuery) {
        updateInputValueStateOrProp('');
      }
    }
  };

  const onOpenChange = (nextOpen: boolean, eventDetails: BaseCombobox.Root.ChangeEventDetails) => {
    /* Prevent closure on select when filtering */
    if (!nextOpen && eventDetails.reason === 'item-press') {
      eventDetails.cancel();
    }
    /* escape key should clear query before closing popup */
    if (!nextOpen && eventDetails.reason === 'escape-key' && localQueryState) {
      updateInputValueStateOrProp('');
      eventDetails.cancel();
    }
  };

  return (
    <Root
      items={items}
      multiple
      value={selectedItems}
      onValueChange={onValueChange}
      inputValue={inputValueStateOrProp}
      onInputValueChange={updateInputValueStateOrProp}
      onOpenChange={onOpenChange}
    >
      <LabelledField label={label} htmlFor={id} width={width}>
        <div className={styles.InputContainer}>
          <Chips className={styles.Chips} ref={containerRef}>
            <Value>
              {(items: Item[]) => (
                <>
                  {items.map((item) => (
                    <Chip key={item.value} className={styles.Chip} aria-label={item.label}>
                      <div className={styles.ChipText}>{item.label}</div>

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
