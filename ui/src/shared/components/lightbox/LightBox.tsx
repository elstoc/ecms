import { MouseEvent, useEffect } from 'react';

import { useKeyPress } from '@/shared/hooks';

import { Button } from '../button';
import { Icon } from '../icon';

import './LightBox.css';

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
    const elements = document.querySelectorAll<HTMLElement>('.fadeout');
    elements.forEach((element) => {
      element.classList.remove('fadeout');
      setTimeout(() => {
        element.classList.add('fadeout');
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
    <div className='lightbox-backdrop' onClick={handleOuterClick}>
      <div className='lightbox-image-container' onMouseMove={restartFadeOut}>
        <img src={imageUrl} alt={alt} />
        <Button clearFormatting className='close fadeout' onClick={onClose}>
          <Icon icon='close' label='close lightbox' className='icon' />
        </Button>
        <div className='preload'>
          {prevImageUrl && <img src={prevImageUrl} alt='preload' />}
          {nextImageUrl && <img src={nextImageUrl} alt='preload' />}
        </div>

        {onPrev && (
          <Button clearFormatting className='prev fadeout' onClick={onPrev}>
            <Icon icon='previous' label='previous image' className='icon' />
          </Button>
        )}
        {onNext && (
          <Button clearFormatting className='next fadeout' onClick={onNext}>
            <Icon icon='next' label='next image' className='icon' />
          </Button>
        )}
        {caption && <div className='image-info fadeout'>{caption}</div>}
      </div>
    </div>
  );
};
