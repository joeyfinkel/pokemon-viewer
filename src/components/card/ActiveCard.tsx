import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CloseButton,
  Flex,
  Heading,
  IconButton,
  IconProps,
  SimpleGrid,
  Tooltip,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useActivePokemon } from '../../context/activePokemonContext';
import { usePokemon } from '../../hooks/usePokemon';
import {
  Entries,
  EvolutionChain,
  Pokemon,
  PokemonSpecies,
  PokemonSprites,
} from '../../types';
import { capitalizeWord } from '../../utils/utils';
import { BasicInformation } from '../BasicInformation';
import { BaseHeadingProps, DataWithHeading } from '../DataWithHeading';
import { EvolutionCards } from './evolution/Cards';
import { ImageCarousel } from './imageCarousel/ImageCarousel';
import { Types } from '../Types';
import { useHotKey } from '../../hooks/useHotKey';

export const ActivePokemonCard: React.FC = () => {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [allEvolutionNames, setAllEvolutionNames] = useState<
    (string | undefined)[]
  >([]);

  const { active, activePokemon, setActive, setActivePokemon, setMainPicture } =
    useActivePokemon();

  const pokemon = usePokemon(50, 0);
  const key = useHotKey();

  const headingsProps: BaseHeadingProps = { gap: 4, headingSize: 'md' };
  const arrowProps: IconProps = { boxSize: 8, role: 'button', focusable: true };

  const surroundingPokemon = useMemo(() => {
    const index = pokemon.findIndex(({ name }) => name === activePokemon?.name);
    const length = pokemon.length - 1;
    const next = index === length ? index : index === -1 ? index : index + 1;
    const prev = index === 0 ? index : index === -1 ? index : index - 1;

    return {
      next: index === -1 ? undefined : pokemon[next].name,
      previous: index === -1 ? undefined : pokemon[prev].name,
    };
  }, [allPokemon, activePokemon, pokemon]);

  const rightArrowOnClick = () => {
    const index = allPokemon.findIndex(
      ({ name }) => name === surroundingPokemon.next
    );

    setActivePokemon?.(allPokemon[index]);
  };

  const leftArrowOnClick = () => {
    const index = allPokemon.findIndex(
      ({ name }) => name === surroundingPokemon.previous
    );

    setActivePokemon?.(allPokemon[index]);
  };

  useEffect(() => {
    const getAllEvolutionNames = async () => {
      const { data: currentPokemonSpecies } = await axios.get<PokemonSpecies>(
        `https://pokeapi.co/api/v2/pokemon-species/${activePokemon?.id}`
      );
      const evolutionChain = currentPokemonSpecies.evolution_chain.url;
      const { data: nextEvolutionObj } = await axios.get<EvolutionChain>(
        evolutionChain
      );
      const { evolves_to, species } = nextEvolutionObj.chain;
      const curr =
        species.name === activePokemon?.name
          ? species.name
          : activePokemon?.name;
      const evolutions = evolves_to
        .map(({ species, evolves_to }) => {
          const currEvolutions = [species.name];

          if (evolves_to.length > 0) {
            evolves_to.forEach(({ species }) => {
              currEvolutions.push(species.name);
            });
          }

          return currEvolutions;
        })
        .flat();

      setAllEvolutionNames([curr, ...evolutions]);

      return [curr, ...evolutions];
    };

    getAllEvolutionNames();
  }, [activePokemon]);

  useEffect(() => {
    const getAllPokemon = async () => {
      const allPokemon = await Promise.all(
        pokemon.map(async (p) => {
          const { data } = await axios.get<Pokemon>(p.url);

          return data;
        })
      );

      setAllPokemon(allPokemon);
    };

    getAllPokemon();
  }, [pokemon]);

  useEffect(() => {
    const switchPokemon = () => {
      if (key === 'ArrowRight') rightArrowOnClick();
      if (key === 'ArrowLeft') leftArrowOnClick();
    };

    switchPokemon();
  }, [key]);

  return (
    <Card overflow='hidden' variant='outline' height='95vh' mb='2'>
      <CardHeader>
        <Flex justify='space-between' align='center'>
          <Flex align='center' gap='2'>
            <Avatar
              src={activePokemon?.sprites.front_default}
              name={activePokemon?.name}
              size='lg'
            />
            <Heading size='xl' fontWeight='bold'>
              {capitalizeWord(activePokemon?.name ?? '')}
            </Heading>
          </Flex>
          <CloseButton size='lg' onClick={() => setActive?.(!active)} />
        </Flex>
      </CardHeader>
      <CardBody>
        <Flex direction='column'>
          <SimpleGrid templateColumns='0.8fr 1.2fr' gap='2'>
            {activePokemon && (
              <>
                <Flex direction='column' justify='space-between' gap='4'>
                  <DataWithHeading {...headingsProps} text='Basic Information'>
                    <BasicInformation
                      pokemon={activePokemon}
                      border='1px solid black'
                      borderRadius='1rem'
                      p='2'
                    />
                  </DataWithHeading>

                  <DataWithHeading {...headingsProps} text='Types'>
                    <Box border='1px solid black' borderRadius='1rem' p='2'>
                      <Types pokemon={activePokemon} gap='2' />
                    </Box>
                  </DataWithHeading>

                  <EvolutionCards
                    {...headingsProps}
                    names={allEvolutionNames}
                  />
                </Flex>

                <DataWithHeading {...headingsProps} text='Images'>
                  <ImageCarousel pokemon={activePokemon} />
                </DataWithHeading>
              </>
            )}
          </SimpleGrid>
        </Flex>
      </CardBody>
      <CardFooter justify='flex-end'>
        <Flex justify='flex-end' gap='2'>
          {activePokemon?.id === 1 ? (
            <Tooltip label={surroundingPokemon.next}>
              <IconButton
                aria-label='Next pokemon'
                variant='ghost'
                icon={<ArrowForwardIcon {...arrowProps} />}
                onClick={rightArrowOnClick}
              />
            </Tooltip>
          ) : activePokemon?.id === pokemon.length ? (
            <Tooltip label={surroundingPokemon.previous}>
              <IconButton
                aria-label='Previous pokemon'
                variant='ghost'
                icon={<ArrowBackIcon {...arrowProps} />}
                onClick={leftArrowOnClick}
              />
            </Tooltip>
          ) : (
            <>
              <Tooltip label={surroundingPokemon.previous}>
                <IconButton
                  aria-label='Previous pokemon'
                  variant='ghost'
                  icon={<ArrowBackIcon {...arrowProps} />}
                  onClick={leftArrowOnClick}
                />
              </Tooltip>
              <Tooltip label={surroundingPokemon.next}>
                <IconButton
                  aria-label='Next pokemon'
                  variant='ghost'
                  icon={<ArrowForwardIcon {...arrowProps} />}
                  onClick={rightArrowOnClick}
                />
              </Tooltip>
            </>
          )}
        </Flex>
      </CardFooter>
    </Card>
  );
};
