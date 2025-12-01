import cn from 'classnames';
import {
  ListBox,
  Popover,
  ComboBox as RaComboBox,
  ComboBoxProps as RaComboBoxProps,
} from 'react-aria-components';

import { IconButton } from '../icon-button';
import { Input } from '../input';
import { Label } from '../label';

import './ComboBox.css';

type ComboBoxProps<T extends object> = RaComboBoxProps<T> & {
  label: string;
};

export const ComboBox = <T extends object>(props: ComboBoxProps<T>) => {
  const className = cn('ecms-combo-box', props.className);

  return (
    <RaComboBox allowsEmptyCollection menuTrigger='focus' {...props} className={className}>
      <div className='input-and-label'>
        <Label>{props.label}</Label>
        <div className='input-and-button'>
          <Input />
          <IconButton label='' icon='down' />
        </div>
      </div>
      <Popover maxHeight={150} className='ecms-combo-box-popover'>
        <ListBox
          className='ecms-combo-box-listbox'
          renderEmptyState={() => <div className='ecms-item no-results'>No results found</div>}
        >
          {props.children}
        </ListBox>
      </Popover>
    </RaComboBox>
  );
};
