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
  const { lookupTable, ...passProps } = props;
  const lookupValues = useLookup(lookupTable);

  return <SelectDescribedCode allItems={lookupValues} {...passProps} />;
};
