import cn from 'classnames';

import { ComboBox } from '../combo-box';
import { ListBoxItem } from '../list-box';

type SelectDescribedCodeProps = {
  label: string;
  className?: string;
  items: { [code: string]: string };
  selectedCode?: string;
  onSelectCode: (selectedCode?: string) => void;
};

export const SelectDescribedCode = (props: SelectDescribedCodeProps) => {
  const classNames = cn('ecms-select-described-code', props.className);

  const itemsAsArray = Object.entries(props.items).map(([id, description]) => ({
    id,
    description,
  }));

  return (
    <ComboBox
      className={classNames}
      label={props.label}
      items={itemsAsArray}
      selectedKey={props.selectedCode ?? null}
      onSelectionChange={(selectedItem) => {
        if (selectedItem) {
          props.onSelectCode(selectedItem.toString() || undefined);
        }
      }}
    >
      {itemsAsArray.map((item) => (
        <ListBoxItem id={item.id} key={item.id}>
          {item.description}
        </ListBoxItem>
      ))}
    </ComboBox>
  );
};
