import { Icon } from '../icon';

type FlagParams = {
  value: boolean | undefined;
  onChange?: (value: boolean) => void;
  className?: string;
  color?: string;
};

export const Flag = ({ value, onChange, className, color = 'green' }: FlagParams) => {
  let calculatedColor = color;
  if (value === false) {
    calculatedColor = 'lightgrey';
  } else if (value === undefined) {
    calculatedColor = 'orange';
  }

  return (
    <Icon
      icon='flag'
      label={value ? 'unflag' : 'flag'}
      className={className}
      color={calculatedColor}
      onClick={() => onChange?.(!value)}
    />
  );
};
