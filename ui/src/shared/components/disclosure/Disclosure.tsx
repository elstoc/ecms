import cn from 'classnames';
import { useEffect, useState } from 'react';
import {
  Disclosure as RaDisclosure,
  DisclosureProps as RaDisclosureProps,
} from 'react-aria-components';

import './Disclosure.css';

type DisclosureProps = Pick<RaDisclosureProps, 'children' | 'isExpanded' | 'onExpandedChange'>;

export const Disclosure = (props: DisclosureProps) => {
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
    const timeout = newExpansionState ? 10 : 350;
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
