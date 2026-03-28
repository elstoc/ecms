import { Collapsible } from '@base-ui/react/collapsible';
import { ReactNode } from 'react';

import * as styles from './Disclosure.module.css';

type DisclosurePanelProps = {
  children: ReactNode;
  keepMounted?: boolean;
};

export const DisclosurePanel = (props: DisclosurePanelProps) => {
  return (
    <Collapsible.Panel {...props} className={styles.Panel}>
      {props.children}
    </Collapsible.Panel>
  );
};
