import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  useMediaQuery,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ActivePokemonContextProvider } from '../context/activePokemonContext';
import { useMediaQueries } from '../hooks/useMediaQueries';
import { usePokemon } from '../hooks/usePokemon';
import { ActivePokemonCard } from './card/ActiveCard';
import { PokemonSelect } from './PokemonSelect';
import { PokemonWrapper } from './PokemonWrapper';

interface Props {
  limit: number;
  offset: number;
}

export const Pokemon: React.FC<Props> = ({ limit, offset }) => {
  const [active, setActive] = useState(false);
  const { xs: xSmall, sm: small } = useMediaQueries();
  const isMobile = xSmall || small;
  const pokemon = usePokemon(limit, offset);

  return (
    <ActivePokemonContextProvider active={active} setActive={setActive}>
      <Container
        maxW='100vw'
        pt='1'
        pb='2'
        overflowY='hidden'
        maxH={active ? '100vh' : ''}
      >
        {active ? (
          <Flex
            direction={isMobile ? 'column' : 'row'}
            gap={4}
            overflowY='hidden'
          >
            {!isMobile ? (
              <Box maxH='100vh' overflowY='scroll' overflowX='hidden'>
                <PokemonWrapper
                  pokemon={pokemon}
                  active={active}
                  limit={limit}
                  offset={offset}
                />
              </Box>
            ) : (
              <>
                <Heading>Pokemon</Heading>
                <PokemonSelect pokemon={pokemon} />
              </>
            )}
            <Box flexGrow='1'>
              <ActivePokemonCard />
            </Box>
          </Flex>
        ) : (
          <PokemonWrapper
            pokemon={pokemon}
            active={active}
            limit={limit}
            offset={offset}
          />
        )}
      </Container>
    </ActivePokemonContextProvider>
  );
};
