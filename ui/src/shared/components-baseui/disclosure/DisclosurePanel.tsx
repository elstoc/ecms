import { Collapsible } from '@base-ui/react/collapsible';
import { ReactNode } from 'react';

type DisclosurePanelProps = {
  children: ReactNode;
};

export const DisclosurePanel = (props: DisclosurePanelProps) => {
  return (
    <Collapsible.Panel {...props} className='ec-disclosure-panel'>
      {props.children}
    </Collapsible.Panel>
  );
};
