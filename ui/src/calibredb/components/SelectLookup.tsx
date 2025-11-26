import { SelectDescribedCode } from '@/shared/legacy-components/forms';

import { useLookup } from '../hooks/useCalibreDbQueries';

type SelectLookupProps = {
  lookupTable: string;
  allowUndefinedCodeSelection?: boolean;
  valueForUndefinedCode?: string;
  selectedCode?: string;
  onChange?: (selectedKey?: string) => void;
  label: string;
  inline?: boolean;
  filterable?: boolean;
  disabled?: boolean;
  className?: string;
};

export const SelectLookup = (props: SelectLookupProps) => {
  const { lookupTable, ...passProps } = props;
  const lookupValues = useLookup(lookupTable);

  return <SelectDescribedCode allItems={lookupValues} {...passProps} />;
};
