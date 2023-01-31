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
import { useActivePokemon } from '../../context/activePokemonContext';
import { Pokemon } from '../../types';

interface Props extends CardProps {
  url: string;
}

export const PokemonAvatarCard: React.FC<Props> = ({
  url,
  height,
  width,
  ...rest
}) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [color, setColor] = useState<CardProps['bgColor']>('gray.400');

  const { activePokemon, setActivePokemon } = useActivePokemon();

  const activeColor = 'gray.500';

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
      direction='row'
      bgColor={activePokemon?.name === pokemon?.name ? activeColor : color}
      role='button'
      onClick={() => setActivePokemon?.(pokemon)}
      onMouseEnter={() => setColor(activeColor)}
      onMouseLeave={() => setColor('gray.400')}
      {...rest}
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
