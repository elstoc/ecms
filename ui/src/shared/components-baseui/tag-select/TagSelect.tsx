import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import { useId, useRef, useState } from 'react';

import { ComboboxPortal } from '../combobox';
import { LabelledField } from '../labelled-field';

import styles from './TagSelect.module.css';

const { Root, Chips, Value, Chip, Input, ChipRemove } = BaseCombobox;

export type Item = {
  value: string;
  label: string;
};

type TagSelectProps = {
  label: string;
  selectedTags: string[];
  selectableTags: string[];
  onChange: (newValue: string[]) => void;
  emptyMessage: string;
};

export const TagSelect = ({
  selectableTags,
  label,
  emptyMessage,
  selectedTags,
  onChange,
}: TagSelectProps) => {
  const [query, setQuery] = useState('');
  const allTagItems: Item[] = selectableTags.map((tag) => ({ value: tag, label: tag }));
  const selectedTagItems = allTagItems.filter((item) => selectedTags.includes(item.value));

  const containerRef = useRef<HTMLDivElement | null>(null);
  const id = useId();

  const onValueChange = (
    newSelectedTagItems: Item[],
    eventDetails: BaseCombobox.Root.ChangeEventDetails,
  ) => {
    /* prevent deletion of all selected tags with the escape key */
    if (eventDetails.reason !== 'escape-key') {
      onChange(newSelectedTagItems.map((item) => item.value));
    }
  };

  return (
    <Root
      items={allTagItems}
      multiple
      value={selectedTagItems}
      onValueChange={onValueChange}
      inputValue={query}
      onInputValueChange={setQuery}
      onOpenChange={(nextOpen, eventDetails) => {
        /* Prevent closure on select when filtering */
        if (!nextOpen && eventDetails.reason === 'item-press') {
          eventDetails.cancel();
        }
      }}
    >
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
