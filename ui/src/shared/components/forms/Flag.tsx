import { Icon } from '../icon';

import './Flag.scss';

type FlagParams = {
  value: boolean | undefined;
  onChange?: (value: boolean) => void;
  className?: string;
  color?: string;
};

export const Flag = ({ value, onChange, className = '', color }: FlagParams) => {
  let calculatedColor = color || 'firebrick';
  if (value === false) {
    calculatedColor = 'lightgrey';
  } else if (value === undefined) {
    calculatedColor = 'orange';
  }

  return (
    <Icon
      onClick={onChange && (() => onChange(!value))}
      className={`flag-component ${value === false ? '' : 'checked'} ${className}`}
      name='flag'
      color={calculatedColor}
    />
  );
};
