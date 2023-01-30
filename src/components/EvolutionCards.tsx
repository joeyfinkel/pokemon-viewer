import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BaseHeadingProps, DataWithHeading } from './DataWithHeading';
import { EvolutionCard } from './EvolutionCard';
import { PokemonAvatarCard } from './PokemonAvatarCard';

interface Props extends BaseHeadingProps {
  names: (string | undefined)[];
}

export const EvolutionCards: React.FC<Props> = ({
  names,
  gap,
  headingSize,
}) => {
  const [current, setCurrent] = useState(names?.[0]);

  const url = (name: string) => `https://pokeapi.co/api/v2/pokemon/${name}`;

  return (
    <DataWithHeading gap={gap} headingSize={headingSize} text='Evolutions'>
      <Flex
        direction='column'
        gap='2'
        border='1px solid black'
        borderRadius='1rem'
        p='2'
      >
        <Flex gap='1.2'>
          {[...new Set(names)]?.map((name, idx) => (
            <EvolutionCard
              key={idx}
              url={url(name ?? '')}
              height='200px'
              width='200px'
              onClick={() => setCurrent(name)}
            />
          ))}
        </Flex>
        <PokemonAvatarCard url={url(current ?? '')} />
      </Flex>
    </DataWithHeading>
  );
};
