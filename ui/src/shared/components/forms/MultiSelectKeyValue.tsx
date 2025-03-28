import { FormGroup, MenuItem } from '@blueprintjs/core';
import { ItemPredicate, ItemRenderer, MultiSelect } from '@blueprintjs/select';
import { useState } from 'react';

import './MultiSelectKeyValue.scss';

export type KeyValue = { key: string; value: string };

type MultiSelectKeyValueParams = {
  allItems: { [key: string]: string };
  selectedKeys: string[];
  onSelectionChange?: (selectedKeys: string[]) => void;
  label: string;
  inline?: boolean;
  className?: string;
};

export const MultiSelectKeyValue = ({
  allItems,
  selectedKeys,
  onSelectionChange,
  label,
  inline,
  className = '',
}: MultiSelectKeyValueParams) => {
  const [queryString, setQueryString] = useState('');
  const allItemsArray = Object.entries(allItems).map(([key, value]) => ({ key, value }));
  const selectedItems = selectedKeys.map((key) => ({ key, value: allItems[key] ?? '' }));

  const popoverClassName = className ? `${className}-popover` : '';

  const toggleItem = (item: KeyValue) => {
    if (!selectedKeys.includes(item.key)) {
      onSelectionChange?.([...selectedKeys, item.key]);
    } else {
      onSelectionChange?.(selectedKeys.filter((key) => key !== item.key));
    }
  };

  const clearItems = () => {
    onSelectionChange?.([]);
  };

  const areTheyEqual = (item1: KeyValue, item2: KeyValue): boolean => {
    return item1.key === item2.key;
  };

  const itemRenderer: ItemRenderer<KeyValue> = (
    keyValue: KeyValue,
    { handleClick, handleFocus, modifiers },
  ) => {
    return (
      <MenuItem
        text={keyValue.value}
        key={keyValue.key}
        roleStructure='listoption'
        selected={selectedKeys.includes(keyValue.key)}
        shouldDismissPopover={true}
        active={modifiers.active}
        disabled={modifiers.disabled}
        onFocus={handleFocus}
        onClick={handleClick}
      />
    );
  };

  const tagRenderer = (keyValue: KeyValue) => keyValue.value;

  const filterItems: ItemPredicate<KeyValue> = (query: string, item: KeyValue) => {
    if (!query || item.value.toLowerCase().includes(query.toLowerCase())) {
      return true;
    }
    return false;
  };

  return (
    <FormGroup label={label} inline={inline} className={`${className} multi-select-key-value`}>
      <MultiSelect<KeyValue>
        items={allItemsArray}
        selectedItems={selectedItems}
        tagRenderer={tagRenderer}
        itemRenderer={itemRenderer}
        itemsEqual={areTheyEqual}
        onItemSelect={toggleItem}
        onRemove={toggleItem}
        onClear={clearItems}
        itemPredicate={filterItems}
        query={queryString}
        onQueryChange={setQueryString}
        resetOnSelect={true}
        popoverProps={{ minimal: true }}
        placeholder=''
        fill={false}
        popoverContentProps={{
          className: `${popoverClassName} multi-select-key-value-popover`,
        }}
      />
    </FormGroup>
  );
};
