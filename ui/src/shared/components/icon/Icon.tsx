// See https://react-icons.github.io/react-icons for summary of available icons
import cn from 'classnames';
import {
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiEdit,
  FiFlag,
  FiMenu,
  FiPlusSquare,
  FiSave,
  FiTrash2,
  FiUser,
  FiUserX,
  FiX,
} from 'react-icons/fi';
import {
  LuArrowDownAZ,
  LuArrowDownWideNarrow,
  LuArrowUpNarrowWide,
  LuShuffle,
} from 'react-icons/lu';

import { Button } from '../button';

import './Icon.css';

const icons = {
  user: FiUser,
  noUser: FiUserX,
  edit: FiEdit,
  delete: FiTrash2,
  cancel: FiX,
  save: FiSave,
  next: FiChevronRight,
  previous: FiChevronLeft,
  close: FiX,
  flag: FiFlag,
  add: FiPlusSquare,
  menu: FiMenu,
  download: FiDownload,
  check: FiCheck,
  shuffle: LuShuffle,
  sortDesc: LuArrowDownWideNarrow,
  sortAsc: LuArrowUpNarrowWide,
  sortAscAlpha: LuArrowDownAZ,
};

type IconProps = {
  name: keyof typeof icons;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  color?: string;
  label: string;
};

export const Icon = ({ name, onClick, disabled, className, color, label }: IconProps) => {
  const IconComponent = icons[name];
  const classNames = cn('ecms-icon', className);

  if (onClick) {
    return (
      <Button
        aria-label={label}
        clearFormatting
        className={classNames}
        isDisabled={disabled}
        onClick={onClick}
      >
        <IconComponent title='' className='icon' color={color} />
      </Button>
    );
  }

  return (
    <div className={cn(classNames, { disabled: disabled })}>
      <IconComponent title={label} className='icon' color={color} />
    </div>
  );
};
