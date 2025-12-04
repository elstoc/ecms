import cn from 'classnames';
import { ListBox as RaListBox, ListBoxProps as RaListBoxProps } from 'react-aria-components';

import './ListBox.css';

type ListBoxProps<T extends object> = Pick<RaListBoxProps<T>, 'children' | 'className'> & {
  emptyStateMessage?: string;
};

export const ListBox = <T extends object>(props: ListBoxProps<T>) => {
  const classNames = cn('ecms-list-box', props.className);

  const emptyStateElement = (
    <div className='ecms-list-box-item no-results'>{props.emptyStateMessage}</div>
  );

  return (
    <RaListBox
      className={classNames}
      renderEmptyState={props.emptyStateMessage ? () => emptyStateElement : undefined}
    >
      {props.children}
    </RaListBox>
  );
};
