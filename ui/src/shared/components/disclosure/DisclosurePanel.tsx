import {
  DisclosurePanel as RaDisclosurePanel,
  DisclosurePanelProps as RaDisclosurePanelProps,
} from 'react-aria-components';

type DisclosurePanelProps = Pick<RaDisclosurePanelProps, 'children'>;

export const DisclosurePanel = (props: DisclosurePanelProps) => {
  return (
    <RaDisclosurePanel {...props} className='ecms-disclosure-panel'>
      <div className='grid-child'>{props.children}</div>
    </RaDisclosurePanel>
  );
};
