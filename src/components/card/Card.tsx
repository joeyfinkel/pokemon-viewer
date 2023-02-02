import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardProps,
  Center,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link as RouterLink } from 'react-router-dom';
import { useActivePokemon } from '../../context/activePokemonContext';
import { Pokemon } from '../../types';
import { PokemonUtils } from '../../utils/pokemon';
import { capitalizeWord } from '../../utils/utils';
import { BasicInformation } from '../BasicInformation';
import { Types } from '../Types';

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
  const [param] = useSearchParams();

  const { active, setActive, setActivePokemon } = useActivePokemon();

  const onClick = () => {
    setActive?.(!active);
    setActivePokemon?.(pokemon);

    if (pokemon?.id) param.append('id', pokemon?.id.toString());
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
          <Flex direction='column' align='flex-start' gap='2'>
            <Heading size='md'>{PokemonUtils.capitalizeName(pokemon)}</Heading>
            {pokemon && <Types pokemon={pokemon} gap='3' />}
          </Flex>
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
