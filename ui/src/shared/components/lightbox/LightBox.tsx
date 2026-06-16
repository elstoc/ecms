import cn from 'classnames';
import { MouseEvent, useEffect } from 'react';

import { useKeyPress } from '@/shared/hooks';

import { Button } from '../button';
import { Icon } from '../icon';

import * as styles from './LightBox.module.css';

type LightBoxProps = {
  open: boolean;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  caption?: string;
  imageUrl: string;
  alt?: string;
  prevImageUrl?: string;
  nextImageUrl?: string;
};

export const LightBox = ({
  open,
  onClose,
  onPrev,
  onNext,
  caption,
  alt,
  imageUrl,
  prevImageUrl,
  nextImageUrl,
}: LightBoxProps) => {
  const handleOuterClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  const restartFadeOut = () => {
    const elements = document.querySelectorAll<HTMLElement>(`.${styles.Fadeout}`);
    elements.forEach((element) => {
      element.classList.remove(styles.Fadeout);
      setTimeout(() => {
        element.classList.add(styles.Fadeout);
      }, 10);
    });
  };

  useEffect(() => {
    restartFadeOut();
  });

  useKeyPress(['Backspace', 'Escape'], () => onClose?.());
  useKeyPress(['ArrowLeft'], () => onPrev?.());
  useKeyPress(['ArrowRight'], () => onNext?.());
  useKeyPress(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'], null);

  if (!open) {
    return <></>;
  }

  return (
    <div className={styles.Backdrop} onClick={handleOuterClick}>
      <div className={styles.ImageContainer} onMouseMove={restartFadeOut}>
        <img className={styles.CurrentImage} src={imageUrl} alt={alt} />
        <Button clearFormatting className={cn(styles.Close, styles.Fadeout)} onClick={onClose}>
          <Icon icon='close' label='close lightbox' className={styles.Icon} />
        </Button>
        <div className={styles.Preload}>
          {prevImageUrl && <img src={prevImageUrl} alt='preload' />}
          {nextImageUrl && <img src={nextImageUrl} alt='preload' />}
        </div>

        {onPrev && (
          <Button clearFormatting className={cn(styles.Prev, styles.Fadeout)} onClick={onPrev}>
            <Icon icon='previous' label='previous image' className={styles.Icon} />
          </Button>
        )}
        {onNext && (
          <Button clearFormatting className={cn(styles.Next, styles.Fadeout)} onClick={onNext}>
            <Icon icon='next' label='next image' className={styles.Icon} />
          </Button>
        )}
        {caption && <div className={cn(styles.Info, styles.Fadeout)}>{caption}</div>}
      </div>
    </div>
  );
};
