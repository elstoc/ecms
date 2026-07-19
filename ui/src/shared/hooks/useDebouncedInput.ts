import { useCallback, useEffect, useRef, useState } from 'react';

type UseDebouncedInputReturn<T> = {
  debouncedValue: T;
  debouncedOnChange: (value: T) => void;
};

export const useDebouncedInput = <T>(
  externalValue: T,
  externalOnChange: (value: T) => void,
  debounceTimeout?: number,
): UseDebouncedInputReturn<T> => {
  const [pendingValue, setPendingValue] = useState<T>(externalValue);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedOnChange = useCallback(
    (value: T) => {
      setPendingValue(value);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      timeoutRef.current = setTimeout(() => {
        externalOnChange(value);
      }, debounceTimeout ?? 0);
    },
    [debounceTimeout, externalOnChange],
  );

  useEffect(() => {
    // eslint-disable-next-line @eslint-react/set-state-in-effect
    setPendingValue(externalValue);
  }, [externalValue]);

  if (!debounceTimeout) {
    return {
      debouncedValue: externalValue,
      debouncedOnChange: externalOnChange,
    };
  }

  return {
    debouncedValue: pendingValue,
    debouncedOnChange: debouncedOnChange,
  };
};
