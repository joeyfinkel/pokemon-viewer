import { useMediaQuery } from '@chakra-ui/react';

type Params = Parameters<typeof useMediaQuery>;
type DefaultMediaQuery = {
  /** 0 to 600px. */
  xs: boolean;
  /** 600px to 768px. */
  sm: boolean;
  /** 768px to 992px. */
  md: boolean;
  /** 992px to 1200px. */
  lg: boolean;
  /** 1200px and up. */
  xl: boolean;
};

/**
 * Hook to get the current state of the media queries.
 * @returns An object with the current state of the media queries.
 * - `xSmall`: `(max-width: 600px)` - 0 to 600px
 * - `small`: `(mix-width: 600px)` - 600px to 768px
 * - `medium`: `(min-width: 768px)` - 768px to 992px
 * - `large`: `(min-width: 992px)` - 992px to 1200px
 * - `xLarge`: `(min-width: 1200px)` - 1200px and up
 */
export function useMediaQueries(): DefaultMediaQuery;
/**
 * Hook to get the current state of the media queries.
 * @param query The media query to check.
 * @param options The options to pass to the `useMediaQuery` hook.
 */
export function useMediaQueries(
  query: Params[0],
  options?: Params[1]
): boolean[];
export function useMediaQueries(query?: Params[0], options?: Params[1]) {
  const queries = useMediaQuery(
    query
      ? query
      : [
          '(max-width: 600px)',
          '(max-width: 600px)',
          '(min-width: 768px)',
          '(min-width: 992px)',
          '(min-width: 1200px)',
        ],
    options
  );

  const [test] = useMediaQuery('(max-width: 600px)');

  if (!query) {
    const [xs, sm, md, lg, xl] = queries;

    return { xs, sm, md, lg, xl };
  }

  return queries;
}
