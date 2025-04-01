// See https://react-icons.github.io/react-icons for summary of available icons
import { IconType } from 'react-icons';
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
import { LuArrowDownWideNarrow, LuArrowUpNarrowWide, LuShuffle } from 'react-icons/lu';

import './Icon.scss';

const icons: { [key: string]: IconType } = {
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
};

type IconProps = {
  name: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  color?: string;
};

export const Icon = ({ name, onClick, disabled = false, className = '', color }: IconProps) => {
  const IconComponent = icons[name];

  if (!IconComponent) return <></>;

  const iconOnClick = disabled ? undefined : onClick;
  const divClass = `icon-div ${className} ${disabled ? 'disabled' : ''} ${iconOnClick ? 'clickable' : ''}`;

  return (
    <div className={divClass} onClick={iconOnClick}>
      <IconComponent className='icon' color={color} />
    </div>
  );
};
