import cn from 'classnames';

import { ComboBox } from '../combo-box';
import { ListBoxItem } from '../list-box';

type SelectStringProps = {
  label: string;
  className?: string;
  items: string[];
  selectedItem?: string;
  onSelectItem: (selectedItem?: string) => void;
};

export const SelectString = (props: SelectStringProps) => {
  const classNames = cn('ecms-combo-box', props.className);

  return (
    <ComboBox
      className={classNames}
      label={props.label}
      items={props.items.map((item) => ({ id: item }))}
      selectedKey={props.selectedItem ?? null}
      onSelectionChange={(selectedItem) => {
        if (selectedItem) {
          props.onSelectItem(selectedItem.toString() || undefined);
        }
      }}
    >
      {props.items.map((item) => (
        <ListBoxItem id={item} key={item}>
          {item}
        </ListBoxItem>
      ))}
    </ComboBox>
  );
};
