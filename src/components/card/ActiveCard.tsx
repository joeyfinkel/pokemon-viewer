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
  useMediaQuery,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useActivePokemon } from '../../context/activePokemonContext';
import { useCurrentParams } from '../../hooks/useCurrentParams';
import { useHotKey } from '../../hooks/useHotKey';
import { usePokemon } from '../../hooks/usePokemon';
import { EvolutionChain, Pokemon, PokemonSpecies } from '../../types';
import { capitalizeWord } from '../../utils/utils';
import { BasicInformation } from '../BasicInformation';
import { BaseHeadingProps, DataWithHeading } from '../DataWithHeading';
import { Types } from '../Types';
import { EvolutionCards } from './evolution/Cards';
import { ImageCarousel } from './imageCarousel/ImageCarousel';

export const ActivePokemonCard: React.FC = () => {
  const [currPokemon, setCurrPokemon] = useState<Pokemon | null>(null);
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [allEvolutionNames, setAllEvolutionNames] = useState<
    (string | undefined)[]
  >([]);
  const [isMobile] = useMediaQuery('(max-width: 600px)');

  const { setActive, setActivePokemon } = useActivePokemon();

  const [, setParams] = useSearchParams();

  const pokemon = usePokemon(50, 0);
  const key = useHotKey();
  const location = useLocation();
  const currentParams = useCurrentParams();

  const headingsProps: BaseHeadingProps = { gap: 4, headingSize: 'md' };
  const arrowProps: IconProps = { boxSize: 8, role: 'button', focusable: true };

  const surroundingPokemon = useMemo(() => {
    const index = pokemon.findIndex(({ name }) => name === currPokemon?.name);
    const length = pokemon.length - 1;
    const next = index === length ? index : index === -1 ? index : index + 1;
    const prev = index === 0 ? index : index === -1 ? index : index - 1;

    return {
      next: index === -1 ? undefined : pokemon[next].name,
      previous: index === -1 ? undefined : pokemon[prev].name,
    };
  }, [allPokemon, currPokemon, pokemon]);

  const close = () => {
    setActive?.(false);
    setActivePokemon?.(null);
  };

  const updatePokemon = (updateType: keyof typeof surroundingPokemon) => {
    const index = allPokemon.findIndex(
      ({ name }) => name === surroundingPokemon[updateType]
    );
    const { id } = allPokemon[index];
    const { id: pId, ...rest } = currentParams;
    const newParams = new URLSearchParams({
      ...rest,
      id: id.toString(),
    });

    setActivePokemon?.(allPokemon[index]);
    setParams(newParams);
  };

  const rightArrowOnClick = () => updatePokemon('next');

  const leftArrowOnClick = () => updatePokemon('previous');

  useEffect(() => {
    const getId = () => {
      const { search } = location;
      const split = search.split('&');
      const idIdx = split.findIndex((value) => value.includes('id'));
      const id = split[idIdx]?.replace('id=', '');

      return id;
    };

    const getPokemon = async () => {
      const id = getId();
      const { data } = await axios.get<Pokemon>(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );

      setCurrPokemon(data);
    };

    getPokemon();
  }, [location]);

  useEffect(() => {
    const getAllEvolutionNames = async () => {
      const { data: currentPokemonSpecies } = await axios.get<PokemonSpecies>(
        `https://pokeapi.co/api/v2/pokemon-species/${currPokemon?.id}`
      );
      const evolutionChain = currentPokemonSpecies.evolution_chain.url;
      const { data: nextEvolutionObj } = await axios.get<EvolutionChain>(
        evolutionChain
      );
      const { evolves_to, species } = nextEvolutionObj.chain;
      const curr =
        species.name === currPokemon?.name ? species.name : currPokemon?.name;
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
    };

    getAllEvolutionNames();
  }, [currPokemon]);

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
      if (key === 'Escape') close();
    };

    switchPokemon();
  }, [key]);

  return (
    <Card
      overflow='hidden'
      variant='outline'
      height={{ sm: '80vh', xl: '98vh' }}
      mb='2'
    >
      <CardHeader>
        <Flex justify='space-between' align='center'>
          <Flex align='center' gap='2'>
            <Avatar
              src={currPokemon?.sprites.front_default}
              name={currPokemon?.name}
              size='lg'
            />
            <Heading size='xl' fontWeight='bold'>
              {currPokemon?.name && capitalizeWord(currPokemon?.name)}
            </Heading>
          </Flex>
          <CloseButton size='lg' onClick={close} />
        </Flex>
      </CardHeader>
      <CardBody overflowY={isMobile ? 'scroll' : 'hidden'}>
        <Flex direction='column'>
          <SimpleGrid
            templateColumns={{ sm: '1fr', md: '1fr', lg: '1fr 1fr' }}
            gap='2'
          >
            {currPokemon && (
              <>
                <Flex direction='column' justify='space-between' gap='4'>
                  <SimpleGrid columns={{ sm: 2, lg: 1, xl: 1 }} spacing={2}>
                    <Flex direction='column' gap='2'>
                      <DataWithHeading
                        {...headingsProps}
                        text='Basic Information'
                      >
                        <BasicInformation
                          pokemon={currPokemon}
                          border='1px solid black'
                          borderRadius='1rem'
                          p='2'
                        />
                      </DataWithHeading>

                      <DataWithHeading {...headingsProps} text='Types'>
                        <Box border='1px solid black' borderRadius='1rem' p='2'>
                          <Types pokemon={currPokemon} gap='2' />
                        </Box>
                      </DataWithHeading>
                    </Flex>

                    <EvolutionCards
                      {...headingsProps}
                      names={allEvolutionNames}
                    />
                  </SimpleGrid>
                </Flex>

                <DataWithHeading {...headingsProps} text='Images'>
                  <ImageCarousel pokemon={currPokemon} />
                </DataWithHeading>
              </>
            )}
          </SimpleGrid>
        </Flex>
      </CardBody>
      <CardFooter justify='flex-end'>
        <Flex justify='flex-end' gap='2'>
          {currPokemon?.id === 1 ? (
            <Tooltip label={surroundingPokemon.next}>
              <IconButton
                aria-label='Next pokemon'
                variant='ghost'
                icon={<ArrowForwardIcon {...arrowProps} />}
                onClick={rightArrowOnClick}
              />
            </Tooltip>
          ) : currPokemon?.id === pokemon.length ? (
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
