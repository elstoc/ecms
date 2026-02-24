import { useMemo } from 'react';

import { InputWidth } from '@/shared/components/labelled-field';
import { Item, Select } from '@/shared/components/select';

import { useLookup } from '../hooks/useVideoDbQueries';

type SelectLookupBUIProps = {
  lookupTable: string;
  valueForNullCode?: string;
  label: string;
  value: string | null;
  onChange: (newValue: string | null) => void;
  width?: InputWidth;
};

export const SelectLookupBUI = (props: SelectLookupBUIProps) => {
  const { lookupTable, valueForNullCode, ...rest } = props;
  const lookupValues = useLookup(lookupTable);

  const items: Item[] = useMemo(() => {
    const returnItems: Item[] = Object.entries(lookupValues).map(([code, description]) => ({
      value: code,
      label: description,
    }));

    if (valueForNullCode) {
      returnItems.unshift({ value: null, label: valueForNullCode });
    }

    return returnItems;
  }, [lookupValues, props.valueForNullCode]);

  return <Select items={items} {...rest} />;
};
