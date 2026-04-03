import { Button as BaseButton, ButtonProps as BaseButtonProps } from '@base-ui/react/button';
import cn from 'classnames';

import * as styles from './Button.module.css';

export type ButtonProps = Pick<
  BaseButtonProps,
  'children' | 'onClick' | 'disabled' | 'type' | 'tabIndex'
> & {
  /** Additional class name */
  className?: string;
  /** Remove background and border */
  clearFormatting?: boolean;
};

export const Button = ({ clearFormatting, className, ...props }: ButtonProps) => {
  const classes = cn(styles.Root, className, {
    [styles.ClearFormatting]: clearFormatting,
  });

  return (
    <BaseButton
      {...props}
      className={classes}
      onClick={(e) => {
        if (props.onClick) {
          props.onClick(e);
          e.stopPropagation();
        }
      }}
    />
  );
};
