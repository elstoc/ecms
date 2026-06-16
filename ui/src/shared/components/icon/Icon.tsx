// See https://react-icons.github.io/react-icons for summary of available icons
import cn from 'classnames';
import {
  FiBookOpen,
  FiCheck,
  FiChevronDown,
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

import * as styles from './Icon.module.css';

const icons = {
  user: FiUser,
  noUser: FiUserX,
  edit: FiEdit,
  delete: FiTrash2,
  cancel: FiX,
  save: FiSave,
  next: FiChevronRight,
  previous: FiChevronLeft,
  down: FiChevronDown,
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
  sortBook: FiBookOpen,
  sortAuthor: FiUser,
};

export type IconProps = {
  icon: keyof typeof icons;
  label: string;
  isDisabled?: boolean;
  className?: string;
  color?: string;
};

export const Icon = ({ icon, isDisabled, className, color, label }: IconProps) => {
  const IconComponent = icons[icon];
  const classNames = cn(className, { [styles.Disabled]: isDisabled });

  return (
    <div className={classNames}>
      <IconComponent title={label} className={styles.Icon} color={color} />
    </div>
  );
};
