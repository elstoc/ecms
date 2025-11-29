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

export type IconProps = {
  icon: keyof typeof icons;
  label: string;
  disabled?: boolean;
  className?: string;
  color?: string;
};

export const Icon = ({ icon, disabled, className, color, label }: IconProps) => {
  const IconComponent = icons[icon];
  const classNames = cn('ecms-icon', className);

  return (
    <div className={cn(classNames, { disabled: disabled })}>
      <IconComponent title={label} className='icon' color={color} />
    </div>
  );
};
