import { Flex } from '@chakra-ui/react';
import React from 'react';
import { Entries, PokemonSprites } from '../../../types';
import { Images } from './Images';

interface Props {
  entries: Entries<PokemonSprites>[];
  imgName: keyof PokemonSprites;
  setCurrentImage: (entries: Entries<PokemonSprites>) => void;
}

export const ImageChooser: React.FC<Props> = ({
  entries,
  imgName,
  setCurrentImage,
}) => {
  return (
    <Flex justify='center' mb='2' gap='2'>
      {entries.map(
        ([key, sprite], idx) =>
          typeof sprite === 'string' && (
            <Images
              key={idx}
              currentImageName={imgName}
              name={key}
              onClick={() => setCurrentImage([key, sprite])}
              entries={[key, sprite]}
            />
          )
      )}
    </Flex>
  );
};
