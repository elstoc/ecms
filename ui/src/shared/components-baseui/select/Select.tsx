import { Select as BaseSelect } from '@base-ui/react/select';
import { ReactNode } from 'react';

import { LabelledField } from '../labelled-field';

import './Select.css';

type SelectProps<T> = {
  label: string;
  children: ReactNode;
  value: T | null;
  onChange: (newValue: T | null) => void;
  items: ReadonlyArray<{
    label: React.ReactNode;
    value: T;
  }>;
};

export const Select = <T,>({ value, label, items, children, onChange }: SelectProps<T>) => {
  return (
    <LabelledField label={label}>
      <BaseSelect.Root items={items} value={value} onValueChange={(value) => onChange(value)}>
        <BaseSelect.Trigger className='ec-select-trigger'>
          <BaseSelect.Value className='ec-select-value' placeholder='-' />
          <BaseSelect.Icon className='ec-select-icon'>
            <ChevronUpDownIcon />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>

        <BaseSelect.Portal>
          <BaseSelect.Positioner
            className='ec-select-positioner'
            alignItemWithTrigger={false}
            sideOffset={5}
          >
            <BaseSelect.Popup className='ec-select-popup'>
              <BaseSelect.List className='ec-select-list'>{children}</BaseSelect.List>
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </BaseSelect.Root>
    </LabelledField>
  );
};

const ChevronUpDownIcon = (props: React.ComponentProps<'svg'>) => {
  return (
    <svg
      width='8'
      height='12'
      viewBox='0 0 8 12'
      fill='none'
      stroke='currentcolor'
      strokeWidth='1.5'
      {...props}
    >
      <path d='M0.5 4.5L4 1.5L7.5 4.5' />
      <path d='M0.5 7.5L4 10.5L7.5 7.5' />
    </svg>
  );
};
