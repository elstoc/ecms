import { FormGroup, MenuItem } from '@blueprintjs/core';
import { ItemPredicate, ItemRenderer, MultiSelect } from '@blueprintjs/select';
import { useState } from 'react';

import './MultiTagInput.scss';

export type KeyValue = { key: string; value: string };

type MultiTagInputParams = {
  selectableTags?: string[];
  selectedTags?: string[];
  onChange?: (selectedTags?: string[]) => void;
  label: string;
  className?: string;
  allowCreation?: boolean;
};

export const MultiTagInput = ({
  selectableTags,
  selectedTags,
  onChange,
  label,
  className = '',
  allowCreation = true,
}: MultiTagInputParams) => {
  const [queryString, setQueryString] = useState('');
  const allTags = Array.from(new Set([...(selectableTags ?? []), ...(selectedTags ?? [])])).sort(
    (a, b) => a.toLowerCase().localeCompare(b.toLowerCase()),
  );

  const popoverClassName = className ? `${className}-popover` : '';

  const toggleTag = (tag: string) => {
    if (!selectedTags?.includes(tag)) {
      onChange?.([...(selectedTags ?? []), tag]);
    } else {
      const newTags = selectedTags?.filter((tagToRemove) => tag !== tagToRemove);
      onChange?.(newTags && newTags.length > 0 ? newTags : undefined);
    }
  };

  const itemRenderer: ItemRenderer<string> = (tag, { handleClick, handleFocus, modifiers }) => {
    return (
      <MenuItem
        text={tag}
        key={tag}
        selected={selectedTags?.includes(tag)}
        shouldDismissPopover={true}
        roleStructure='listoption'
        active={modifiers.active}
        disabled={modifiers.disabled}
        onFocus={handleFocus}
        onClick={handleClick}
      />
    );
  };

  const createItemRenderer = (
    query: string,
    active: boolean,
    handleClick: React.MouseEventHandler<HTMLElement>,
  ) => {
    return (
      <MenuItem
        icon='add'
        text={query}
        key={query}
        active={active}
        onClick={handleClick}
        roleStructure='listoption'
        shouldDismissPopover={true}
      />
    );
  };

  const optionalCreateItemRenderer = allowCreation ? createItemRenderer : undefined;

  const filterTag: ItemPredicate<string> = (query: string, tag: string) => {
    if (!query || tag.toLowerCase().includes(query.toLowerCase())) {
      return true;
    }
    return false;
  };

  return (
    <FormGroup label={label} inline={true} className={`${className} multi-tag-input`}>
      <MultiSelect<string>
        items={allTags}
        selectedItems={selectedTags ?? []}
        tagRenderer={(tag) => tag}
        itemRenderer={itemRenderer}
        createNewItemFromQuery={(tag) => tag}
        createNewItemRenderer={optionalCreateItemRenderer}
        onItemSelect={toggleTag}
        onRemove={toggleTag}
        onClear={() => onChange?.([])}
        itemPredicate={filterTag}
        query={queryString}
        onQueryChange={setQueryString}
        resetOnSelect={true}
        placeholder=''
        noResults={<MenuItem disabled={true} text='No results.' roleStructure='listoption' />}
        popoverProps={{ minimal: true, matchTargetWidth: true }}
        popoverContentProps={{ className: `${popoverClassName} multi-tag-input-popover` }}
      />
    </FormGroup>
  );
};
