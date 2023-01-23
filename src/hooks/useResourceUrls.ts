import { useMemo } from 'react';
import { useEndpoints } from './useEndpoints';

export const useResourceUrls = () => {
  const endpoints = useEndpoints();

  return useMemo(() => endpoints.map(([, url]) => url), []);
};
