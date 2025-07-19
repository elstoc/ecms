import cn from 'classnames';
import { useEffect, useState } from 'react';
import {
  Disclosure as RaDisclosure,
  DisclosurePanel as RaDisclosurePanel,
  DisclosurePanelProps as RaDisclosurePanelProps,
  DisclosureProps as RaDisclosureProps,
  Heading as RaHeading,
  HeadingProps as RaHeadingProps,
} from 'react-aria-components';

import { Button } from '../button';

import './Disclosure.css';

const Heading = (props: RaHeadingProps) => {
  return <RaHeading {...props} className='ecms-heading' />;
};

export const Disclosure = (props: RaDisclosureProps) => {
  // The React-Aria Disclosure component cannot be animated in closure because it immediately switches
  //   the disclosure panel to be visually hidden when its state changes (no matter its height)
  // This component therefore reports the eventual state (after animation) to the parent and sets a class
  //   to change the height (which begins the animation) but does not set the contained React-Aria
  //   expansion state until after the animation has completed
  const eventualExpansionState = !!props.isExpanded;
  const setEventualExpansionState = props.onExpandedChange;
  const [fullExpansionState, setFullExpansionState] = useState(eventualExpansionState);

  // Protect against state misalignment (can happen when fast clicking)
  // Each time the "full" expansion state is finalised, make sure the "eventual" state matches it
  useEffect(() => {
    if (fullExpansionState !== eventualExpansionState) props.onExpandedChange?.(fullExpansionState);
  }, [fullExpansionState]);

  const handleExpandedChange = async (newExpansionState: boolean) => {
    setEventualExpansionState?.(newExpansionState);

    // the expansion animation always works (it's immediately visible and can then expand naturally)
    // the collapse animation needs time to finish (once it's fully hidden it can't continue to collapse)
    const timeout = newExpansionState ? 0 : 200;
    setTimeout(() => {
      setFullExpansionState((state) => !state);
    }, timeout);
  };

  const classNames = cn('ecms-disclosure', { visuallyExpanded: eventualExpansionState });

  return (
    <RaDisclosure
      {...props}
      className={classNames}
      isExpanded={fullExpansionState}
      onExpandedChange={handleExpandedChange}
    />
  );
};

export const DisclosurePanel = (props: RaDisclosurePanelProps) => {
  return (
    <RaDisclosurePanel {...props} className='ecms-disclosure-panel'>
      <div className='grid-child'>{props.children}</div>
    </RaDisclosurePanel>
  );
};

type TriggerButtonProps = { heading?: string; clearButtonFormatting?: boolean };

export const TriggerButton = ({ heading, clearButtonFormatting }: TriggerButtonProps) => {
  return (
    <Heading>
      <Button slot='trigger' clearFormatting={clearButtonFormatting}>
        {heading}
        <svg viewBox='0 0 24 24'>
          <path d='m8.25 4.5 7.5 7.5-7.5 7.5' />
        </svg>
      </Button>
    </Heading>
  );
};
