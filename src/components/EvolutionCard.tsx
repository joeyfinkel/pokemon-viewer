import {
  Avatar,
  Card,
  CardHeader,
  Flex,
  Text,
  CardProps,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { usePokemon } from '../hooks/usePokemon';

interface Props {
  url: string;
  width: CardProps['maxW'];
  height: CardProps['maxH'];
  onClick?: CardProps['onClick'];
}

export const EvolutionCard: React.FC<Props> = ({
  url,
  height,
  width,
  onClick,
}) => {
  const [color, setColor] = useState<CardProps['bgColor']>('gray.400');

  const pokemon = usePokemon(url);

  return (
    <Card
      maxW={width}
      maxH={height}
      variant='elevated'
      colorScheme='green'
      overflow='hidden'
      me='3'
      direction='row'
      bgColor={color}
      role='button'
      onClick={onClick}
      onMouseEnter={() => setColor('gray.500')}
      onMouseLeave={() => setColor('gray.400')}
    >
      <CardHeader>
        <Flex alignItems='center' gap='2'>
          <Avatar src={pokemon?.sprites?.front_default} name={pokemon?.name} />
          <Text fontWeight='bold'>{pokemon?.name?.replaceAll('_', ' ')}</Text>
          {/* <Text fontWeight='bold'>
            {capitalizeWord(pokemon?.name.replaceAll('_', ' ') ?? '')}
          </Text> */}
        </Flex>
      </CardHeader>
    </Card>
  );
};
