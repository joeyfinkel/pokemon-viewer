import { Box, Flex, useMediaQuery } from '@chakra-ui/react';
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
  const [isMobile] = useMediaQuery('(max-width: 600px)');

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
        <Box
          gap='1.2'
          display='flex'
          flexDirection={{ sm: 'column', md: 'row', lg: 'row', xl: 'row' }}
        >
          {[...new Set(names)]?.map((name, idx) => (
            <EvolutionCard
              key={idx}
              url={setUrl(name)}
              height='200px'
              width='auto'
              onClick={() => setCurrent(name)}
            />
          ))}
        </Box>
        {!isMobile && <PokemonAvatarCard url={setUrl(current)} />}
      </Flex>
    </DataWithHeading>
  );
};
