import { SimpleGrid, SimpleGridProps } from '@chakra-ui/react';
import React from 'react';
import { useActivePokemon } from '../context/activePokemonContext';
import { usePokemon } from '../hooks/usePokemon';
import { DataWithHeading } from './DataWithHeading';
import { PokemonAvatarCard } from './PokemonAvatarCard';
import { PokemonCard } from './PokemonCard';

interface Props extends Pick<SimpleGridProps, 'spacing' | 'templateColumns'> {
  active: boolean;
}

export const PokemonWrapper: React.FC<Props> = ({ active }) => {
  const pokemon = usePokemon(50, 0);
  const {} = useActivePokemon();

  const getPokemonId = (url: string) => {
    return url
      .substring(url.lastIndexOf('pokemon/'))
      .replace('pokemon', '')
      .replaceAll('/', '');
  };

  return (
    <DataWithHeading text='Pokemon' gap='3' headingSize='xl'>
      <SimpleGrid
        py='2'
        spacing={6}
        templateColumns='repeat(auto-fill, minmax(300px, 1fr))'
        overflowX='hidden'
      >
        {pokemon.map((resource) => {
          const { url } = resource;
          const id = getPokemonId(url);

          return active ? (
            <PokemonAvatarCard
              key={id}
              id={id}
              url={url}
              height='10em'
              width='md'
            />
          ) : (
            <PokemonCard key={id} url={url} height='md' width='md' />
          );
        })}
      </SimpleGrid>
    </DataWithHeading>
  );
};
