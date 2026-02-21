import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import { useId, useRef, useState } from 'react';

import { ComboboxPortal } from '../combobox';
import { InputWidth, LabelledField } from '../labelled-field';

import styles from './TagSelect.module.css';

const { Root, Chips, Value, Chip, Input, ChipRemove } = BaseCombobox;

export type Item = {
  value: string;
  label: string;
};

const tagsToItems = (tags: string[]): Item[] =>
  tags.map((tag) => ({
    value: tag,
    label: tag,
  }));

type TagSelectProps = {
  label: string;
  selectedTags: string[];
  selectableTags: string[];
  onChange: (newValue: string[]) => void;
  emptyMessage: string;
  allowCreation?: boolean;
  width?: InputWidth;
};

export const TagSelect = ({
  selectableTags,
  label,
  emptyMessage,
  selectedTags,
  onChange,
  allowCreation,
  width = 'md',
}: TagSelectProps) => {
  const id = useId();
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement | null>(null);

  const unselectedTags = selectableTags.filter((tag) => !selectedTags.includes(tag));

  const selectedTagItems = tagsToItems(selectedTags);
  const unselectedTagItems = tagsToItems(unselectedTags);
  const allTagItems = [...selectedTagItems, ...unselectedTagItems];

  const sortedTagItems = allTagItems.toSorted((itemA, itemB) =>
    itemA.value.toLowerCase().localeCompare(itemB.value.toLowerCase()),
  );

  if (allowCreation && query && !sortedTagItems.find((item) => item.value === query)) {
    sortedTagItems.unshift({ value: query, label: ` + ${query}` });
  }

  const onValueChange = (
    newSelectedTagItems: Item[],
    eventDetails: BaseCombobox.Root.ChangeEventDetails,
  ) => {
    if (eventDetails.reason !== 'escape-key') {
      /* prevent deletion of all selected tags with the escape key */
      onChange(newSelectedTagItems.map((item) => item.value));
    }

    if (query && allowCreation) {
      /* clear query if new item has been added */
      const isSelectedItemSameAsQuery = Boolean(
        newSelectedTagItems.find((item) => item.value === query),
      );

      if (isSelectedItemSameAsQuery) {
        setQuery('');
      }
    }
  };

  return (
    <Root
      items={sortedTagItems}
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
        /* escape key should clear query before closing popup */
        if (!nextOpen && eventDetails.reason === 'escape-key' && query) {
          setQuery('');
          eventDetails.cancel();
        }
      }}
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
