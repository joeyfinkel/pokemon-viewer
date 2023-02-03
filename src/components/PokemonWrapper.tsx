import { SimpleGrid, SimpleGridProps } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useActivePokemon } from '../context/activePokemonContext';
import { NamedAPIResource } from '../types';
import { PokemonUtils } from '../utils/pokemon';
import { PokemonAvatarCard } from './card/AvatarCard';
import { PokemonCard } from './card/Card';
import { DataWithHeading } from './DataWithHeading';
import { VirtualizedList } from './VirtualizedList';

interface Props extends Pick<SimpleGridProps, 'spacing' | 'templateColumns'> {
  active: boolean;
  limit: number;
  offset: number;
  pokemon: NamedAPIResource<string>[];
}

export const PokemonWrapper: React.FC<Props> = ({
  active,
  limit,
  offset,
  pokemon,
}) => {
  const [, setParams] = useSearchParams();
  const { activePokemon } = useActivePokemon();
  const parentRef = useRef<HTMLDivElement>(null);

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
        columns={active ? 1 : { sm: 1, md: 2, lg: 3, xl: 4 }}
        overflowX='hidden'
        scrollSnapType='y mandatory'
        zIndex='docked'
      >
        <VirtualizedList data={pokemon} ref={parentRef}>
          {({ row }) => {
            const { url } = pokemon[row.index];
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
          }}
        </VirtualizedList>
      </SimpleGrid>
    </DataWithHeading>
  );
};
