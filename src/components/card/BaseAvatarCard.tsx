import {
  Avatar,
  Card,
  CardHeader,
  Flex,
  Text,
  CardProps,
} from '@chakra-ui/react';
import React from 'react';
import { Pokemon } from '../../types';
import { PokemonUtils } from '../../utils/pokemon';

interface Props extends CardProps {
  pokemon: Pokemon | null;
}

export const BaseAvatarCard: React.FC<Props> = ({ pokemon, ...rest }) => {
  return (
    <Card
      variant='elevated'
      overflow='hidden'
      direction='row'
      role='button'
      {...rest}
    >
      <CardHeader>
        <Flex alignItems='center' gap='2'>
          <Avatar src={pokemon?.sprites?.front_default} name={pokemon?.name} />
          <Text fontWeight='bold'>{PokemonUtils.capitalizeName(pokemon)}</Text>
        </Flex>
      </CardHeader>
    </Card>
  );
};
