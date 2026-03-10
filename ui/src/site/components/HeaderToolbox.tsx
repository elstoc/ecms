import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { UserInfo } from '@/auth';

import './HeaderToolbox.css';

type ChildrenOnly = {
  children: ReactNode;
};

type HeaderToolboxProps = {
  componentTools?: ReactNode;
};

export const HeaderToolbox = ({ componentTools }: HeaderToolboxProps) => {
  return (
    <div className='toolbox-content'>
      <div className='left'>
        <div id='sidebar-expander-target'></div>
      </div>
      <div className='right'>
        <div id='component-tools-target'>{componentTools}</div>
        <UserInfo />
      </div>
    </div>
  );
};

export const InjectSideExpander = ({ children }: ChildrenOnly) => {
  const [expanderTarget, setExpanderTarget] = useState<HTMLElement | null>(null);

  // TODO: This will be better solved with a layout component
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setExpanderTarget(document.getElementById('sidebar-expander-target'));
  });

  if (!expanderTarget) {
    return <></>;
  }

  return createPortal(children, expanderTarget);
};
