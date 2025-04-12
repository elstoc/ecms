import { SelectKeyValue } from '@/shared/components/forms';

import { useVideoDb } from '../hooks/useVideoDb';
import { useLookup } from '../hooks/useVideoDbQueries';

type VideoSelectLookupProps = {
  lookupTable: string;
  allowUndefinedKeySelection?: boolean;
  valueForUndefinedKey?: string;
  selectedKey?: string;
  onSelectionChange?: (selectedKey?: string) => void;
  label: string;
  inline?: boolean;
  filterable?: boolean;
  className?: string;
};

export const VideoSelectLookup = (props: VideoSelectLookupProps) => {
  const {
    lookupTable,
    allowUndefinedKeySelection,
    valueForUndefinedKey,
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
      allowUndefinedKeySelection={allowUndefinedKeySelection}
      valueForUndefinedKey={valueForUndefinedKey}
      allItems={lookupKeyValues}
      onSelectionChange={onSelectionChange}
      selectedKey={selectedKey}
      className={className}
      inline={inline}
      filterable={filterable}
    />
  );
};
