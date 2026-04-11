import { ReactNode } from 'react';

import { useIsDualPanel } from '@/shared/hooks';

import { CWSDualPanel } from './CWSDualPanel';
import { CWSSinglePanel } from './CWSSinglePanel';

export type ContentWithSideBarProps = {
  children: ReactNode;
  sidebar: ReactNode;
  closeSidebarOnClick?: boolean;
  componentTools?: ReactNode;
};

export const ContentWithSidebar = (props: ContentWithSideBarProps) => {
  const isDualPanel = useIsDualPanel();

  if (isDualPanel) {
    return <CWSDualPanel {...props} />;
  }

  return <CWSSinglePanel {...props} />;
};
