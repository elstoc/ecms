import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type ComponentToolboxProps = {
  children: ReactNode;
};

/* This is a React component that can be called from any other component
   and injects itself into the Site Header */

export const ComponentToolbox = ({ children }: ComponentToolboxProps) => {
  const [toolbarElement, setToolbarElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setToolbarElement(document.getElementById('component-toolbox'));
  });

  if (!toolbarElement) {
    return <></>;
  }

  return createPortal(<>{children}</>, toolbarElement);
};
