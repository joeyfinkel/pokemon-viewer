import {
  Avatar,
  Card,
  CardHeader,
  CardProps,
  Flex,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useActivePokemon } from '../context/activePokemonContext';
import { Pokemon } from '../types';

interface Props {
  url: string;
  height?: CardProps['maxH'];
  width?: CardProps['maxW'];
}

export const PokemonAvatarCard: React.FC<Props> = ({ url, height, width }) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [color, setColor] = useState<CardProps['bgColor']>('gray.400');

  const { setActivePokemon } = useActivePokemon();

  useEffect(() => {
    const getData = async () => {
      const { data: currentPokemon } = await axios.get<Pokemon>(url);

      setPokemon(currentPokemon);
    };

    getData();
  }, []);

  return (
    <Card
      maxW={width}
      maxH={height}
      variant='elevated'
      overflow='hidden'
      me='3'
      direction='row'
      bgColor={color}
      role='button'
      onClick={() => setActivePokemon?.(pokemon)}
      onMouseEnter={() => setColor('gray.500')}
      onMouseLeave={() => setColor('gray.400')}
    >
      <CardHeader>
        <Flex alignItems='center' gap='2'>
          <Avatar src={pokemon?.sprites?.front_default} name={pokemon?.name} />
          <Text fontWeight='bold'>{pokemon?.name?.replaceAll('_', ' ')}</Text>
        </Flex>
      </CardHeader>
    </Card>
  );
};
