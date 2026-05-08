import { useEffect, useRef } from 'react';

export const useTitle = (title: string) => {
  const originalTitleRef = useRef(document.title);

  useEffect(() => {
    document.title = title;

    const originalValue = originalTitleRef.current;

    return () => {
      document.title = originalValue;
    };
  }, [title]);
};
