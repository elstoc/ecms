import { useMemo } from 'react';

import { InputWidth } from '@/shared/components/labelled-field';
import { Item, Select } from '@/shared/components/select';

import { useLookup } from '../hooks/useCalibreDbQueries';

type SelectLookupProps = {
  lookupTable: string;
  valueForNullCode?: string;
  label: string;
  value: string | null;
  onChange: (newValue: string | null) => void;
  width?: InputWidth;
  disabled?: boolean;
};

export const SelectLookup = (props: SelectLookupProps) => {
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
  }, [lookupValues, valueForNullCode]);

  return <Select items={items} {...rest} />;
};
