import cn from 'classnames';
import { Popover as RaPopover, PopoverProps as RaPopoverProps } from 'react-aria-components';

import './Popover.css';

type PopoverProps = Pick<RaPopoverProps, 'children' | 'maxHeight' | 'className'>;

export const Popover = (props: PopoverProps) => {
  const classNames = cn('ecms-popover', props.className);

  return (
    <RaPopover className={classNames} maxHeight={props.maxHeight}>
      {props.children}
    </RaPopover>
  );
};
