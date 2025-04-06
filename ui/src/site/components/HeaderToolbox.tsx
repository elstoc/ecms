import { Card } from '@blueprintjs/core';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { UserInfo } from '@/auth';

import './HeaderToolbox.scss';

type InjectComponentToolsProps = {
  children: ReactNode;
};

export const HeaderToolbox = () => {
  return (
    <div className='toolbox-content'>
      <div id='component-tools-target'></div>
      <UserInfo />
    </div>
  );
};

/* This is a React component that can be called from any other component
   and injects itself into the Header Toolbox */
export const InjectComponentTools = ({ children }: InjectComponentToolsProps) => {
  const [toolsTarget, setToolsTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setToolsTarget(document.getElementById('component-tools-target'));
  });

  if (!toolsTarget) {
    return <></>;
  }

  return createPortal(<Card className='toolbox'>{children}</Card>, toolsTarget);
};
