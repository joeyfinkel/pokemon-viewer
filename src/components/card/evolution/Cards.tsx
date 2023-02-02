import { Flex } from '@chakra-ui/react';
import React, { useState, useEffect, useCallback } from 'react';
import { BaseHeadingProps, DataWithHeading } from '../../DataWithHeading';
import { EvolutionCard } from './Card';
import { PokemonAvatarCard } from '../AvatarCard';

interface Props extends BaseHeadingProps {
  names: (string | undefined)[];
}

export const EvolutionCards: React.FC<Props> = ({
  names,
  gap,
  headingSize,
}) => {
  const [current, setCurrent] = useState(names?.[0]);

  const setUrl = (name: string | undefined) =>
    name ? `https://pokeapi.co/api/v2/pokemon/${name}` : '';

  useEffect(() => {
    const resetName = () => setCurrent(names?.[0]);

    resetName();
  }, []);

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
              url={setUrl(name)}
              height='200px'
              width='200px'
              onClick={() => setCurrent(name)}
            />
          ))}
        </Flex>
        <PokemonAvatarCard url={setUrl(current)} />
      </Flex>
    </DataWithHeading>
  );
};
