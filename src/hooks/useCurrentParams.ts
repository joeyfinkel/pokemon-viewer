import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type URLParams = { [key: string]: string };

/**
 * Gets the current params in the url.
 * @param removeId - If true, removes the `id` param from the url.
 * @returns The current params in the url.
 */
export function useCurrentParams(removeId?: boolean) {
  const [currentParams, setCurrentParams] = useState<URLParams>({});

  const location = useLocation();
  useEffect(() => {
    const getSearchParams = () => {
      const { search } = location;
      const allParams = search.replace('?', '').split('&');
      const importantParams = removeId
        ? allParams.slice(0, allParams.length - 1)
        : allParams;
      const currParams = importantParams
        .map((param) => param.split('='))
        .reduce((acc, [k, v]) => {
          acc[k] = v;

          return acc;
        }, {} as URLParams);

      setCurrentParams(currParams);
    };

    getSearchParams();
  }, [location, removeId]);

  return currentParams;
}
