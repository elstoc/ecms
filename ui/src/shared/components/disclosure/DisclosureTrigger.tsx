import { Heading as RaHeading, HeadingProps as RaHeadingProps } from 'react-aria-components';

import { Button } from '../button';

type DisclosureTriggerProps = { heading?: string; clearButtonFormatting?: boolean };

type DisclosureHeadingProps = Pick<RaHeadingProps, 'children'>;

export const DisclosureHeading = (props: DisclosureHeadingProps) => {
  return <RaHeading {...props} className='ecms-disclosure-heading' />;
};

export const DisclosureTrigger = ({ heading, clearButtonFormatting }: DisclosureTriggerProps) => {
  return (
    <DisclosureHeading>
      <Button
        className='ecms-disclosure-trigger'
        slot='trigger'
        clearFormatting={clearButtonFormatting}
      >
        {heading}
        <svg viewBox='0 0 24 24'>
          <path d='m8.25 4.5 7.5 7.5-7.5 7.5' />
        </svg>
      </Button>
    </DisclosureHeading>
  );
};
