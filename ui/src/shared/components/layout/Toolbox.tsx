import { Card } from '@blueprintjs/core';
import { ReactElement } from 'react';

import './Toolbox.scss';

export type ToolboxProps = { content: ReactElement | null; orientation: 'horizontal' | 'vertical' };

export const Toolbox = ({ content, orientation }: ToolboxProps) => {
  return <Card className={`toolbox ${orientation}`}>{content}</Card>;
};
