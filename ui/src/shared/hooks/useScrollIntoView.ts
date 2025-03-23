import { RefObject, useEffect } from 'react';

export const useScrollIntoView = (ref: RefObject<HTMLElement | null>) => {
  useEffect(() => ref?.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }));
};
