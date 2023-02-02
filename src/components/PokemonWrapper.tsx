import { SimpleGrid, SimpleGridProps } from '@chakra-ui/react';
import { useVirtualizer } from '@tanstack/react-virtual';
import React, { useRef, useEffect } from 'react';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonUtils } from '../utils/pokemon';
import { PokemonAvatarCard } from './card/AvatarCard';
import { PokemonCard } from './card/Card';
import { DataWithHeading } from './DataWithHeading';
import { useSearchParams } from 'react-router-dom';
import { useActivePokemon } from '../context/activePokemonContext';

interface Props extends Pick<SimpleGridProps, 'spacing' | 'templateColumns'> {
  active: boolean;
  limit: number;
  offset: number;
}

export const PokemonWrapper: React.FC<Props> = ({ active, limit, offset }) => {
  const [, setParams] = useSearchParams();
  const parentRef = useRef<HTMLDivElement>(null);
  const pokemon = usePokemon(limit, offset);
  const { activePokemon } = useActivePokemon();

  const rowVirtualizer = useVirtualizer({
    count: pokemon.length,
    overscan: 50,
    estimateSize: () => pokemon.length,
    getScrollElement: () => parentRef.current,
  });

  useEffect(() => {
    const setSearchParams = () => {
      const baseParams = {
        limit: limit.toString(),
        offset: offset.toString(),
      };

      setParams(
        activePokemon?.id
          ? {
              ...baseParams,
              id: activePokemon?.id.toString(),
            }
          : baseParams
      );
    };

    setSearchParams();
  }, []);

  return (
    <DataWithHeading text='Pokemon' gap='3' headingSize='xl' ref={parentRef}>
      <SimpleGrid
        py='2'
        spacing={6}
        templateColumns='repeat(auto-fill, minmax(300px, 1fr))'
        overflowX='hidden'
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const { url } = pokemon[virtualRow.index];

          const id = PokemonUtils.getPokemonId(url);

          return active ? (
            <PokemonAvatarCard
              key={id}
              url={url}
              height='10em'
              width='md'
              me='3'
            />
          ) : (
            <PokemonCard key={id} url={url} height='md' width='md' />
          );
        })}
      </SimpleGrid>
    </DataWithHeading>
  );
};
