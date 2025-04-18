import { Button, FormGroup, MenuItem } from '@blueprintjs/core';
import { ItemPredicate, ItemRenderer, Select } from '@blueprintjs/select';

import './SelectDescribedCode.scss';

const UNDEFINED_CODE = 'UNDEFINED_CODE';

export type DescribedCode = { code: string; description: string };

type SelectDescribedCodeParams = {
  allItems: { [code: string]: string };
  allowUndefinedCodeSelection?: boolean;
  valueForUndefinedCode?: string;
  selectedCode?: string;
  onChange?: (selectedCode?: string) => void;
  label: string;
  className?: string;
  inline?: boolean;
  filterable?: boolean;
  disabled?: boolean;
};

export const SelectDescribedCode = ({
  allItems: propsAllItems,
  allowUndefinedCodeSelection,
  valueForUndefinedCode,
  selectedCode,
  onChange,
  label,
  inline,
  className = '',
  filterable = true,
  disabled,
}: SelectDescribedCodeParams) => {
  const allItems = { ...propsAllItems };
  if (allowUndefinedCodeSelection) {
    allItems[UNDEFINED_CODE] = valueForUndefinedCode || ' — ';
  }
  const allItemsArray = Object.entries(allItems).map(([code, description]) => ({
    code,
    description,
  }));

  const popoverClassName = className ? `${className}-popover` : '';

  const changeSelection = (dc: DescribedCode) => {
    onChange?.(dc.code === UNDEFINED_CODE ? undefined : dc.code);
  };

  const filterValue: ItemPredicate<DescribedCode> = (query, item) => {
    return query.length === 0 || item.description.toLowerCase().includes(query.toLowerCase());
  };

  const itemRenderer: ItemRenderer<DescribedCode> = (
    dc: DescribedCode,
    { handleClick, handleFocus, modifiers },
  ) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        text={dc.description}
        key={dc.code}
        roleStructure='listoption'
        active={modifiers.active}
        disabled={modifiers.disabled}
        onFocus={handleFocus}
        onClick={handleClick}
        selected={dc.code === selectedCode}
      />
    );
  };

  return (
    <FormGroup label={label} inline={inline} className={`${className} select-described-code`}>
      <Select<DescribedCode>
        items={allItemsArray.sort((a, b) => a.description.localeCompare(b.description))}
        itemRenderer={itemRenderer}
        itemPredicate={filterValue}
        onItemSelect={changeSelection}
        popoverProps={{ minimal: true }}
        popoverContentProps={{ className: `${popoverClassName} select-described-code-popover` }}
        resetOnSelect={true}
        filterable={filterable}
      >
        <Button
          disabled={disabled}
          text={allItems[selectedCode ?? UNDEFINED_CODE] || ' '}
          endIcon='caret-down'
        />
      </Select>
    </FormGroup>
  );
};
