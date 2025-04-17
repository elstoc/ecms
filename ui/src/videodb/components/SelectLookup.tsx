import { SelectDescribedCode } from '@/shared/components/forms';

import { useLookup } from '../hooks/useVideoDbQueries';

type SelectLookupProps = {
  lookupTable: string;
  allowUndefinedCodeSelection?: boolean;
  valueForUndefinedCode?: string;
  selectedCode?: string;
  onSelectionChange?: (selectedKey?: string) => void;
  label: string;
  inline?: boolean;
  filterable?: boolean;
  className?: string;
};

export const SelectLookup = (props: SelectLookupProps) => {
  const {
    lookupTable,
    allowUndefinedCodeSelection,
    valueForUndefinedCode,
    selectedCode,
    onSelectionChange,
    label,
    inline,
    filterable,
    className,
  } = props;

  const lookupValues = useLookup(lookupTable);

  return (
    <SelectDescribedCode
      label={label}
      allowUndefinedCodeSelection={allowUndefinedCodeSelection}
      valueForUndefinedCode={valueForUndefinedCode}
      allItems={lookupValues}
      onChange={onSelectionChange}
      selectedCode={selectedCode}
      className={className}
      inline={inline}
      filterable={filterable}
    />
  );
};
