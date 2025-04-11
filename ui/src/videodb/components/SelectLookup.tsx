import { SelectKeyValue } from '@/shared/components/forms';

import { useVideoDb } from '../hooks/useVideoDb';
import { useLookup } from '../hooks/useVideoDbQueries';

type SelectLookupProps = {
  lookupTable: string;
  allowUndefinedSelection?: boolean;
  displayUndefinedAs?: string;
  selectedKey?: string;
  onSelectionChange?: (selectedKey?: string) => void;
  label: string;
  inline?: boolean;
  filterable?: boolean;
  className?: string;
};

export const SelectLookup = (props: SelectLookupProps) => {
  const {
    lookupTable,
    allowUndefinedSelection,
    displayUndefinedAs,
    selectedKey,
    onSelectionChange,
    label,
    inline,
    filterable,
    className,
  } = props;
  const {
    state: { apiPath },
  } = useVideoDb();
  const lookupKeyValues = useLookup(apiPath, lookupTable);

  return (
    <SelectKeyValue
      label={label}
      allowUndefinedSelection={allowUndefinedSelection}
      displayUndefinedAs={displayUndefinedAs}
      allItems={lookupKeyValues}
      onSelectionChange={onSelectionChange}
      selectedKey={selectedKey}
      className={className}
      inline={inline}
      filterable={filterable}
    />
  );
};
