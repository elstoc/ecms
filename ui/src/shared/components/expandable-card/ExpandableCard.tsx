import { ReactNode, Ref } from 'react';

import { Card } from '../card';
import { Disclosure, DisclosurePanel } from '../disclosure';

import * as styles from './ExpandableCard.module.css';

export type ExpandableCardRootProps = {
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
  ref?: Ref<HTMLDivElement>;
  children: ReactNode;
};

const Root = ({ expanded, onExpandedChange, ref, children }: ExpandableCardRootProps) => {
  const handleClick = () => {
    onExpandedChange(!expanded);
  };

  return (
    <Card highlight={expanded} ref={ref} className={styles.Root} onClick={handleClick}>
      <Disclosure open={expanded} onOpenChange={onExpandedChange}>
        {children}
      </Disclosure>
    </Card>
  );
};

export type ExpandableCardTopProps = {
  children: ReactNode;
  className?: string;
};

const Top = ({ children, className }: ExpandableCardTopProps) => (
  <div className={className}>{children}</div>
);

export type ExpandableCardBottomProps = {
  children: ReactNode;
  keepMounted?: boolean;
  className?: string;
};

const Bottom = ({ children, keepMounted, className }: ExpandableCardBottomProps) => (
  <DisclosurePanel keepMounted={keepMounted} className={className}>
    {children}
  </DisclosurePanel>
);

export const ExpandableCard = {
  Root,
  Top,
  Bottom,
};
