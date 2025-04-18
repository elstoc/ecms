import { useEffect, useRef } from 'react';

export const useTitle = (title: string) => {
  const originalTitle = useRef(document.title);

  useEffect(() => {
    document.title = title;

    return () => {
      document.title = originalTitle.current;
    };
  }, [title]);
};
