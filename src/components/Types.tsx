import { Flex, FlexProps, Tag } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { Pokemon, PokemonType, TypeOptions } from '../types';

interface Props extends FlexProps {
  pokemon: Pokemon;
}

export const Types: React.FC<Props> = ({ pokemon, ...rest }) => {
  return (
    <Flex {...rest}>
      {pokemon.types.map(({ type }, idx) => (
        <Tag key={idx} variant={type.name}>
          {type.name}
        </Tag>
      ))}
    </Flex>
  );
};
