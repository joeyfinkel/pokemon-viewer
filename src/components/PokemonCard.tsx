import {
  Button,
  Card,
  CardBody,
  CardFooter, CardHeader, CardProps, Center,
  Heading,
  Image, Stack
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useActivePokemon } from '../context/activePokemonContext';
import { Pokemon } from '../types';
import { BasicInformation } from './BasicInformation';

interface Props {
  url: string;
  height?: CardProps['maxH'];
  width?: CardProps['maxW'];
  direction?: CardProps['direction'];
}

export const PokemonCard: React.FC<Props> = ({
  url,
  height,
  width,
  direction,
}: Props) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const { active, setActive, setActivePokemon } = useActivePokemon();

  const onClick = () => {
    setActive?.(!active);
    setActivePokemon?.(pokemon);
  };

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get<Pokemon>(url);

      setPokemon(data);
    };

    getData();
  }, []);

  return (
    <Card
      maxW={width}
      maxH={height}
      variant='elevated'
      colorScheme='green'
      overflow='hidden'
      direction={direction}
      bgColor={active ? 'gray.400' : 'gray.300'}
    >
      <Stack spacing={1}>
        <CardHeader>
          <Heading size='md'>{pokemon?.name?.replaceAll('_', ' ')}</Heading>
        </CardHeader>
        <Center>
          <Image
            src={pokemon?.sprites?.front_default}
            boxSize='150px'
            objectFit='cover'
            alt={pokemon?.name}
            borderRadius='lg'
            style={{ imageRendering: 'pixelated' }}
            loading='lazy'
          />
        </Center>
        <CardBody py={0} px={2}>
          {pokemon && <BasicInformation pokemon={pokemon} xpBar={true} />}
        </CardBody>
        <CardFooter pt={1} pb={2} px={2}>
          <Button variant='solid' colorScheme='blue' onClick={onClick}>
            View
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};
