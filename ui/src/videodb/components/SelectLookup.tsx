import { SelectKeyValue } from '@/shared/components/forms';

import { useVideoDb } from '../hooks/useVideoDb';
import { useGetLookup } from '../hooks/useVideoDbQueries';

type SelectLookupProps = {
  lookupTable: string;
  selectedKey: string;
  onSelectionChange?: (selectedKey: string) => void;
  label: string;
  small?: boolean;
  className?: string;
};

export const SelectLookup = (props: SelectLookupProps) => {
  const { lookupTable, selectedKey, onSelectionChange, label, small, className } = props;
  const {
    state: { apiPath },
  } = useVideoDb();
  const lookupKeyValues = useGetLookup(apiPath, lookupTable);

  return (
    <SelectKeyValue
      label={label}
      allItems={lookupKeyValues}
      onSelectionChange={onSelectionChange}
      selectedKey={selectedKey}
      small={small}
      className={className}
    />
  );
};
