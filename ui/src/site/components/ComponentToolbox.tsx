import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { Icon } from '@/shared/components/icon';

export type ToolProps = {
  key: string;
  icon: string;
  color?: string;
  onClick?: VoidFunction;
};

type ComponentToolboxProps = {
  toolProps: ToolProps[];
};

/* This is a React component that can be called from any other component
   and injects itself into the Site Header */

export const ComponentToolbox = ({ toolProps }: ComponentToolboxProps) => {
  const [toolbarElement, setToolbarElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setToolbarElement(document.getElementById('component-toolbox'));
  });

  if (!toolbarElement) {
    return <></>;
  }

  const icons = toolProps.map((toolProp) => {
    return (
      <Icon
        key={toolProp.key}
        name={toolProp.icon}
        color={toolProp.color}
        onClick={toolProp.onClick}
      />
    );
  });

  return createPortal(icons, toolbarElement);
};
