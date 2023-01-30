import { Text, Box, ProgressLabel, Progress, BoxProps } from '@chakra-ui/react';
import React from 'react';
import { Pokemon } from '../types';

interface Props extends BoxProps {
  pokemon: Pokemon;
  xpBar?: boolean;
}

export const BasicInformation: React.FC<Props> = ({
  pokemon,
  xpBar,
  ...rest
}) => {
  return (
    <Box {...rest}>
      <Text>Id: {pokemon?.id}</Text>
      <Text>Height: {pokemon?.height}</Text>
      <Text>Weight: {pokemon?.weight}</Text>
      {xpBar ? (
        <Box>
          Base experience:{' '}
          <Progress size='sm' value={pokemon?.base_experience} max={500}>
            <ProgressLabel color='inherit'>
              {pokemon?.base_experience}
            </ProgressLabel>
          </Progress>
        </Box>
      ) : (
        <Text>Base experience: {pokemon.base_experience}</Text>
      )}
    </Box>
  );
};
