import { Flex, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Entries, Pokemon, PokemonSprites } from '../../../types';
import { capitalizeWord } from '../../../utils/utils';
import { Images } from './Images';

interface Props {
  pokemon: Pokemon;
}

export const ImageCarousel: React.FC<Props> = ({ pokemon }) => {
  const entries = Object.entries(pokemon.sprites) as Entries<PokemonSprites>[];
  const foundEntry = entries.find(([key]) => key === 'front_default');
  const [currentImage, setCurrentImage] = useState(foundEntry);
  const [imgName, imgSrc] = currentImage ?? [];
  const name = imgName?.replaceAll('_', ' ');

  useEffect(() => {
    const resetPicture = () => setCurrentImage(foundEntry);

    resetPicture();
  }, [pokemon]);

  return (
    <Flex
      direction='column'
      justify='space-between'
      border='1px solid black'
      borderRadius='1rem'
      grow='1'
    >
      <Flex direction='column' align='center'>
        <Image
          objectFit='cover'
          height={{ base: '100%', sm: '300px' }}
          src={imgSrc}
          style={{ imageRendering: 'pixelated' }}
          loading='lazy'
        />
        <Text fontWeight='bold'>{capitalizeWord(name ?? '')}</Text>
      </Flex>

      <Flex justify='center' mb='2' gap='2'>
        {entries.map(([key, sprite], idx) =>
          typeof sprite === 'string' ? (
            <Images
              key={idx}
              currentImageName={imgName}
              name={key}
              onClick={() => setCurrentImage([key, sprite])}
              entries={[key, sprite]}
            />
          ) : null
        )}
      </Flex>
    </Flex>
  );
};
