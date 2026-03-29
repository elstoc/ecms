import { Collapsible } from '@base-ui/react/collapsible';
import cn from 'classnames';
import { ReactNode } from 'react';

import * as styles from './Disclosure.module.css';

type DisclosurePanelProps = {
  children: ReactNode;
  keepMounted?: boolean;
  className?: string;
};

export const DisclosurePanel = (props: DisclosurePanelProps) => {
  return (
    <Collapsible.Panel {...props} className={cn(styles.Panel, props.className)}>
      {props.children}
    </Collapsible.Panel>
  );
};
