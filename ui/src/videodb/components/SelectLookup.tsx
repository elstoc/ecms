import { useContext } from 'react';

import { SelectKeyValue } from '@/shared/components/forms';

import { useGetLookup } from '../hooks/useVideoDbQueries';
import { VideoDbStateContext } from '../hooks/useVideoDbStateContext';

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
    videoDbState: { apiPath },
  } = useContext(VideoDbStateContext);
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
