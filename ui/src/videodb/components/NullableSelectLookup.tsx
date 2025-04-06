import { NullableSelectKeyValue } from '@/shared/components/forms';

import { useVideoDb } from '../hooks/useVideoDb';
import { useGetLookup } from '../hooks/useVideoDbQueries';

type NullableSelectLookupProps = {
  lookupTable: string;
  selectedKey: string | null;
  onSelectionChange?: (selectedKey: string | null) => void;
  label: string;
  small?: boolean;
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
    small,
    className,
    inline,
    nullValueRepr,
    filterable,
  } = props;
  const {
    state: { apiPath },
  } = useVideoDb();
  const lookupKeyValues = useGetLookup(apiPath, lookupTable);

  return (
    <NullableSelectKeyValue
      label={label}
      allItems={lookupKeyValues}
      onSelectionChange={onSelectionChange}
      selectedKey={selectedKey}
      small={small}
      className={className}
      inline={inline}
      nullValueRepr={nullValueRepr}
      filterable={filterable}
    />
  );
};
