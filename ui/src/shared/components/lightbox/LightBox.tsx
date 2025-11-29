import { MouseEvent, useEffect } from 'react';

import { useKeyPress } from '@/shared/hooks';

import { IconButton } from '../icon-button';

import './LightBox.scss';

type LightBoxProps = {
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
      <IconButton label='close lightbox' className='close fadeout' icon='close' onPress={onClose} />
      <div className='preload'>
        {prevImageUrl && <img src={prevImageUrl} alt='preload' />}
        {nextImageUrl && <img src={nextImageUrl} alt='preload' />}
      </div>

      {onPrev && (
        <IconButton
          label='previous image'
          className='prev fadeout'
          icon='previous'
          onPress={onPrev}
        />
      )}
      {onNext && (
        <IconButton label='next image' className='next fadeout' icon='next' onPress={onNext} />
      )}
      {caption && <div className='image-info fadeout'>{caption}</div>}
    </div>
  );
};
