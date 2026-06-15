import { Dialog as BaseDialog } from '@base-ui/react/dialog';

import { Overlay, OverlayProps } from '../overlay/Overlay';

import * as styles from './Dialog.module.css';

const { Title, Close, Description: Content } = BaseDialog;

type DialogProps = OverlayProps & {
  title: string;
};

export const Dialog = ({ children, title, ...overlayProps }: DialogProps) => {
  return (
    <Overlay {...overlayProps}>
      <div className={styles.PopupContent}>
        <div className={styles.Header}>
          <Title className={styles.Title}>{title}</Title>

          <CloseButton />
        </div>

        <Content render={<div />} className={styles.Content}>
          {children}
        </Content>
      </div>
    </Overlay>
  );
};

const CloseButton = () => (
  <Close className={styles.CloseButton} aria-label='Close'>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M18 6 6 18' />
      <path d='m6 6 12 12' />
    </svg>
  </Close>
);
