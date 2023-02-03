import { useVirtualizer, VirtualItem } from '@tanstack/react-virtual';
import React, { forwardRef, RefObject } from 'react';

interface Props<T> {
  data: T[];
  children: (props: { row: VirtualItem; idx: number }) => React.ReactNode;
}

export const VirtualizedList = forwardRef(
  <T extends unknown, R>({ data, children }: Props<T>, ref: React.Ref<R>) => {
    const rowVirtualizer = useVirtualizer({
      count: data.length,
      overscan: 50,
      estimateSize: () => data.length,
      getScrollElement: () => (ref as RefObject<HTMLDivElement>).current,
    });

    return (
      <>
        {rowVirtualizer
          .getVirtualItems()
          .map((row) => children({ row, idx: row.index }))}
      </>
    );
  }
) as <T extends unknown, R>(
  props: Props<T> & { ref?: React.Ref<R> }
) => JSX.Element;
