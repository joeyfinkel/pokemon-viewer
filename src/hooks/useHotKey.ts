import { useCallback, useEffect, useState } from 'react';

export function useHotKey() {
  const [key, setKey] = useState('');

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      setKey(event.key);
      console.log(`Key pressed: ${event.key}`);
    },
    [setKey]
  );

  useEffect(() => {
    // attach the event listener
    document.addEventListener('keydown', handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return key;
}
