import { FormGroup, MenuItem } from '@blueprintjs/core';
import { ItemListPredicate, ItemRenderer, Suggest } from '@blueprintjs/select';
import { useMemo } from 'react';

type SuggestItemProps = {
  label: string;
  items: string[];
  allowUndefined?: boolean;
  displayUndefinedAs?: string;
  value?: string;
  onChange: (item?: string) => void;
  inline?: boolean;
  className?: string;
};

export const SuggestItem = ({
  label,
  items,
  allowUndefined,
  displayUndefinedAs = '',
  value,
  onChange,
  inline,
  className,
}: SuggestItemProps) => {
  const allItems = useMemo(() => {
    let all = [...items];
    if (allowUndefined) {
      // put the undefined value at the top
      all = all.filter((item) => item !== displayUndefinedAs);
      all.unshift(displayUndefinedAs);
    }
    return all;
  }, [items, allowUndefined, displayUndefinedAs]);

  const itemRenderer: ItemRenderer<string> = (
    item: string,
    { handleClick, handleFocus, modifiers },
  ) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        text={item}
        key={item}
        roleStructure='listoption'
        active={modifiers.active}
        disabled={modifiers.disabled}
        onFocus={handleFocus}
        onClick={handleClick}
        selected={item === (value ?? displayUndefinedAs)}
      />
    );
  };

  const filterAll: ItemListPredicate<string> = (query, items) => {
    let newItems = [...items];

    if (query.length > 0) {
      newItems = newItems.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
    }

    newItems = newItems.slice(0, 500);
    return newItems;
  };

  const changeSelection = (selectedItem: string) => {
    onChange(selectedItem === displayUndefinedAs ? undefined : selectedItem);
  };

  const popoverClassName = className ? `${className}-popover` : '';

  return (
    <FormGroup label={label} inline={inline} className={`${className} select-described-code`}>
      <Suggest
        items={allItems}
        selectedItem={value ?? displayUndefinedAs}
        itemRenderer={itemRenderer}
        itemListPredicate={filterAll}
        inputValueRenderer={() => value ?? displayUndefinedAs}
        onItemSelect={changeSelection}
        popoverProps={{ minimal: true }}
        popoverContentProps={{ className: `${popoverClassName} select-described-code-popover` }}
        resetOnSelect={false}
      />
    </FormGroup>
  );
};
