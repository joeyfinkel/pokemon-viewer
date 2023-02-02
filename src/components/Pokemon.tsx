import { Box, Container, HStack } from '@chakra-ui/react';
import { useState } from 'react';
import { ActivePokemonContextProvider } from '../context/activePokemonContext';
import { ActivePokemonCard } from './card/ActiveCard';
import { PokemonWrapper } from './PokemonWrapper';

export const Pokemon: React.FC = () => {
  const [active, setActive] = useState(false);

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
          <HStack spacing={4} overflowY='hidden'>
            <Box maxH='100vh' overflowY='scroll' overflowX='hidden'>
              <PokemonWrapper active={active} />
            </Box>
            <Box flexGrow='1'>
              <ActivePokemonCard />
            </Box>
          </HStack>
        ) : (
          <PokemonWrapper active={active} />
        )}
      </Container>
    </ActivePokemonContextProvider>
  );
};
