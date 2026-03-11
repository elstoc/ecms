import { useCallback, useEffect } from 'react';

export const useKeyPress: (
  keys: string[],
  handler: null | ((event: KeyboardEvent) => void),
  deactivateListener?: boolean,
) => void = (keys, handler, deactivateListener) => {
  const eventListenerFn = useCallback(
    (ev: KeyboardEvent) => {
      if (keys.includes(ev.key)) {
        ev.preventDefault();
        handler?.(ev);
      }
    },
    [keys, handler],
  );

  useEffect(() => {
    const eventListener = (ev: KeyboardEvent) => {
      eventListenerFn(ev);
    };

    window.addEventListener('keydown', eventListener);

    if (deactivateListener) {
      window.removeEventListener('keydown', eventListener);
    }

    return () => {
      window.removeEventListener('keydown', eventListener);
    };
  }, [eventListenerFn, deactivateListener]);
};
