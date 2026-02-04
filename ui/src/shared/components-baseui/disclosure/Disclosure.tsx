import { Collapsible, CollapsibleRootProps } from '@base-ui/react/collapsible';

import './Disclosure.css';

type DisclosureProps = Pick<CollapsibleRootProps, 'children' | 'open' | 'onOpenChange'>;

export const Disclosure = (props: DisclosureProps) => {
  return <Collapsible.Root {...props} className='ec-disclosure' />;
};
