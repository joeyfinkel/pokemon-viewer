import { SimpleGrid, SimpleGridProps } from '@chakra-ui/react';
import { useVirtualizer } from '@tanstack/react-virtual';
import React, { useRef } from 'react';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonUtils } from '../utils/pokemon';
import { PokemonAvatarCard } from './card/AvatarCard';
import { PokemonCard } from './card/Card';
import { DataWithHeading } from './DataWithHeading';

interface Props extends Pick<SimpleGridProps, 'spacing' | 'templateColumns'> {
  active: boolean;
}

export const PokemonWrapper: React.FC<Props> = ({ active }) => {
  const limit = 100000;
  const parentRef = useRef<HTMLDivElement>(null);
  const pokemon = usePokemon(limit, 90);

  const rowVirtualizer = useVirtualizer({
    count: pokemon.length,
    overscan: 50,
    estimateSize: () => pokemon.length,
    getScrollElement: () => parentRef.current,
  });

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
            <PokemonAvatarCard key={id} url={url} height='10em' width='md' me='3' />
          ) : (
            <PokemonCard key={id} url={url} height='md' width='md' />
          );
        })}
      </SimpleGrid>
    </DataWithHeading>
  );
};
