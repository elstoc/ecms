import { useState } from 'react';

import { ComboboxMulti } from '../combobox-multi';
import { InputWidth } from '../labelled-field';

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
  disabled?: boolean;
};

export const TagSelect = ({
  selectableTags,
  label,
  emptyMessage,
  selectedTags,
  onChange,
  allowCreation,
  width = 'md',
  disabled,
}: TagSelectProps) => {
  const [query, setQuery] = useState('');

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

  return (
    <ComboboxMulti
      label={label}
      items={sortedTagItems}
      value={selectedTags}
      emptyMessage={emptyMessage}
      onChange={onChange}
      inputValue={query}
      onInputValueChange={setQuery}
      width={width}
      disabled={disabled}
    />
  );
};
