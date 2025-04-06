import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { UserInfo } from '@/auth';

import './HeaderToolbox.scss';

type ChildrenOnly = {
  children: ReactNode;
};

export const HeaderToolbox = () => {
  return (
    <div className='toolbox-content'>
      <div className='left'>
        <div id='sidebar-expander-target'></div>
      </div>
      <div className='right'>
        <div id='component-tools-target'></div>
        <UserInfo />
      </div>
    </div>
  );
};

/* This is a React component that can be called from any other component
   and injects itself into the Header Toolbox */
export const InjectComponentTools = ({ children }: ChildrenOnly) => {
  const [toolsTarget, setToolsTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setToolsTarget(document.getElementById('component-tools-target'));
  });

  if (!toolsTarget) {
    return <></>;
  }

  return createPortal(children, toolsTarget);
};

export const InjectSideExpander = ({ children }: ChildrenOnly) => {
  const [expanderTarget, setExpanderTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setExpanderTarget(document.getElementById('sidebar-expander-target'));
  });

  if (!expanderTarget) {
    return <></>;
  }

  return createPortal(children, expanderTarget);
};
