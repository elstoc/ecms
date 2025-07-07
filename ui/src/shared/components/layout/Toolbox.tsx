import { ReactNode } from 'react';

import { Card } from '../card';

import './Toolbox.css';

export type ToolboxProps = { children: ReactNode };

export const Toolbox = ({ children }: ToolboxProps) => {
  return <Card className='toolbox'>{children}</Card>;
};
