import cn from 'classnames';
import {
  ListBoxItem as RaListBoxItem,
  ListBoxItemProps as RaListBoxItemProps,
} from 'react-aria-components';

type ListBoxItemProps = Pick<RaListBoxItemProps, 'id' | 'children' | 'className'>;

export const ListBoxItem = (props: ListBoxItemProps) => {
  const classNames = cn('ecms-list-box-item', props.className);

  return (
    <RaListBoxItem {...props} className={classNames}>
      {props.children}
    </RaListBoxItem>
  );
};
