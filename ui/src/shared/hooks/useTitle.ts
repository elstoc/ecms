import { useEffect, useRef } from 'react';

export const useTitle = (title: string) => {
  const originalTitle = useRef(document.title);

  useEffect(() => {
    document.title = title;

    const originalValue = originalTitle.current;

    return () => {
      document.title = originalValue;
    };
  }, [title]);
};
