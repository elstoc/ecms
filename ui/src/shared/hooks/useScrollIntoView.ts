import { RefObject, useEffect } from 'react';

export const useScrollIntoView = (ref: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      ref?.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }, 10);

    return () => clearTimeout(timeoutId);
  });
};
