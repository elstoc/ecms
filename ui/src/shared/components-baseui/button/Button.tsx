import { Button as BaseButton, ButtonProps as BaseButtonProps } from '@base-ui/react/button';
import cn from 'classnames';

import './Button.css';

export type ButtonProps = Pick<BaseButtonProps, 'children' | 'onClick' | 'disabled'> & {
  /** Class name (in addition to `ecms-button`) */
  className?: string;
  /** Remove background and border */
  clearFormatting?: boolean;
};

export const Button = ({ clearFormatting, className, ...props }: ButtonProps) => {
  const classes = cn('ec-button', className, {
    'clear-formatting': clearFormatting,
  });

  return <BaseButton {...props} className={classes} />;
};
