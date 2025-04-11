import { NullableSelectKeyValue } from '@/shared/components/forms';

import { useVideoDb } from '../hooks/useVideoDb';
import { useLookup } from '../hooks/useVideoDbQueries';

type NullableSelectLookupProps = {
  lookupTable: string;
  selectedKey?: string;
  onSelectionChange?: (selectedKey?: string) => void;
  label: string;
  className?: string;
  inline?: boolean;
  nullValueRepr?: string;
  filterable?: boolean;
};

export const NullableSelectLookup = (props: NullableSelectLookupProps) => {
  const {
    lookupTable,
    selectedKey,
    onSelectionChange,
    label,
    className,
    inline,
    nullValueRepr,
    filterable,
  } = props;
  const {
    state: { apiPath },
  } = useVideoDb();
  const lookupKeyValues = useLookup(apiPath, lookupTable);

  return (
    <NullableSelectKeyValue
      label={label}
      allItems={lookupKeyValues}
      onSelectionChange={onSelectionChange}
      selectedKey={selectedKey}
      className={className}
      inline={inline}
      nullValueRepr={nullValueRepr}
      filterable={filterable}
    />
  );
};
