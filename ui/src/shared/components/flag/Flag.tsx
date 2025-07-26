import { Icon } from '../icon';

type FlagParams = {
  flagged?: boolean;
  onChange?: (flagged: boolean) => void;
  className?: string;
  color?: string;
};

export const Flag = ({ flagged, onChange, className, color = 'green' }: FlagParams) => {
  let calculatedColor = color;
  if (flagged === false) {
    calculatedColor = 'lightgrey';
  } else if (flagged === undefined) {
    calculatedColor = 'orange';
  }

  return (
    <Icon
      icon='flag'
      label={flagged ? 'unflag' : 'flag'}
      className={className}
      color={calculatedColor}
      onPress={() => onChange?.(!flagged)}
    />
  );
};
