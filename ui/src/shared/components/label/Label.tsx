import { Label as RaLabel, LabelProps as RaLabelProps } from 'react-aria-components';

import './Label.css';

type LabelProps = RaLabelProps;

export const Label = (props: LabelProps) => {
  return <RaLabel className='ecms-label' {...props} />;
};
