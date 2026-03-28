import { Collapsible } from '@base-ui/react/collapsible';
import cn from 'classnames';

import * as buttonStyles from '../../components/button/Button.module.css';
import * as styles from './Disclosure.module.css';

type DisclosureTriggerProps = { heading?: string; clearButtonFormatting?: boolean };

export const DisclosureTrigger = ({ heading, clearButtonFormatting }: DisclosureTriggerProps) => {
  const classes = cn(buttonStyles.Root, styles.Trigger, {
    [buttonStyles.ClearFormatting]: clearButtonFormatting,
  });

  return (
    <Collapsible.Trigger className={classes}>
      {heading}
      <svg viewBox='0 0 24 24'>
        <path d='m8.25 4.5 7.5 7.5-7.5 7.5' />
      </svg>
    </Collapsible.Trigger>
  );
};
