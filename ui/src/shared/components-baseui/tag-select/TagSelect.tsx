import { Combobox } from '@base-ui/react/combobox';
import * as React from 'react';

import { ComboboxPortal } from '../combobox/ComboboxPortal';
import { LabelledField } from '../labelled-field';

import styles from './TagSelect.module.css';

export type Item = {
  value: string;
  label: string;
};

type TagSelectProps = {
  items: Item[];
  label: string;
  emptyMessage: string;
};

export const TagSelect = ({ items, label, emptyMessage }: TagSelectProps) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const id = React.useId();

  return (
    <Combobox.Root items={items} multiple>
      <LabelledField label={label} htmlFor={id}>
        <div className={styles.Container}>
          <Combobox.Chips className={styles.Chips} ref={containerRef}>
            <Combobox.Value>
              {(items: Item[]) => (
                <>
                  {items.map((item) => (
                    <Combobox.Chip key={item.value} className={styles.Chip} aria-label={item.label}>
                      {item.label}
                      <Combobox.ChipRemove className={styles.ChipRemove} aria-label='Remove'>
                        <XIcon />
                      </Combobox.ChipRemove>
                    </Combobox.Chip>
                  ))}
                  <Combobox.Input id={id} className={styles.Input} />
                </>
              )}
            </Combobox.Value>
          </Combobox.Chips>
        </div>
      </LabelledField>

      <ComboboxPortal emptyMessage={emptyMessage} positionerAnchor={containerRef} />
    </Combobox.Root>
  );
};

function XIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={16}
      height={16}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden
      {...props}
    >
      <path d='M18 6 6 18' />
      <path d='m6 6 12 12' />
    </svg>
  );
}
