import { RefObject, useEffect } from 'react';

export const useScrollIntoView = (ref: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    setTimeout(() => {
      ref?.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }, 10);
  });
};
