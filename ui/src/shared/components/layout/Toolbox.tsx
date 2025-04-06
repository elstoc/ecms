import { Card } from '@blueprintjs/core';
import { ReactNode } from 'react';

import './Toolbox.scss';

export type ToolboxProps = { children: ReactNode };

export const Toolbox = ({ children }: ToolboxProps) => {
  return <Card className='toolbox'>{children}</Card>;
};
