import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Heading,
  Image,
  Progress,
  ProgressLabel,
  Stack,
  Text,
  CardProps,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useActivePokemon } from '../context/activePokemonContext';
import { Pokemon } from '../types';
import { capitalizeWord } from '../utils';
import { BasicInformation } from './BasicInformation';

interface Props {
  url: string;
  height?: CardProps['maxH'];
  width?: CardProps['maxW'];
}

export const PokemonCard: React.FC<Props> = ({ url, height, width }: Props) => {
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
      me='3'
      direction={active ? 'row' : 'column'}
      bgColor={active ? 'gray.400' : 'gray.300'}
    >
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
      <Stack spacing={1}>
        <CardBody py={0} px={2}>
          <Heading size='md'>{pokemon?.name?.replaceAll('_', ' ')}</Heading>
          <BasicInformation pokemon={pokemon!} xpBar={true} />
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
