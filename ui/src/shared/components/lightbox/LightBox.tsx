import { MouseEvent, useEffect } from 'react';

import { useKeyPress } from '@/shared/hooks';

import { Icon } from '../icon';

import './LightBox.scss';

type LightBoxProps = {
  onClose?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  caption?: string;
  imageUrl: string;
  alt?: string;
  prevImageUrl?: string;
  nextImageUrl?: string;
};

export const LightBox = ({
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

  return (
    <div className='lightbox' onClick={handleOuterClick} onMouseMove={restartFadeOut}>
      <img src={imageUrl} alt={alt} />
      <div className='close fadeout' onClick={() => onClose?.()}>
        <Icon label='close lightbox' icon='close' />
      </div>
      <div className='preload'>
        {prevImageUrl && <img src={prevImageUrl} alt='preload' />}
        {nextImageUrl && <img src={nextImageUrl} alt='preload' />}
      </div>

      {onPrev && (
        <div className='prev fadeout' onClick={() => onPrev()}>
          <Icon label='previous image' icon='previous' />
        </div>
      )}
      {onNext && (
        <div className='next fadeout' onClick={() => onNext()}>
          <Icon label='next image' icon='next' />
        </div>
      )}
      {caption && <div className='image-info fadeout'>{caption}</div>}
    </div>
  );
};
