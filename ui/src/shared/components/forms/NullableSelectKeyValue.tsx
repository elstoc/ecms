import { SelectKeyValue } from './SelectKeyValue';

type NullableSelectKeyValueParams = {
  allItems: { [key: string]: string };
  selectedKey?: string;
  onSelectionChange?: (selectedKey?: string) => void;
  label: string;
  className?: string;
  inline?: boolean;
  nullValueRepr?: string;
  filterable?: boolean;
};

export const NullableSelectKeyValue = (params: NullableSelectKeyValueParams) => {
  const allItems = { ...params.allItems };
  const { selectedKey, label, className, inline, nullValueRepr, filterable } = params;
  allItems[''] = nullValueRepr || ' — ';

  const changeSelection = (selectedKey: string) => {
    params.onSelectionChange?.(selectedKey || undefined);
  };

  return (
    <SelectKeyValue
      allItems={allItems}
      selectedKey={selectedKey ?? ''}
      onSelectionChange={changeSelection}
      label={label}
      className={className}
      inline={inline}
      filterable={filterable}
    />
  );
};
