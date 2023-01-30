import { Flex, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useActivePokemon } from '../../context/activePokemonContext';
import { Entries, PokemonSprites } from '../../types';
import { capitalizeWord } from '../../utils';
import { Images } from './Images';

export const ImageCarousel: React.FC = () => {
  const { activePokemon } = useActivePokemon();
  const { sprites } = activePokemon ?? {};
  const spriteEntries = Object.entries(
    sprites ?? {}
  ) as Entries<PokemonSprites>[];

  const [currentImage, setCurrentImage] = useState(
    spriteEntries.find(([key]) => key === 'front_default')
  );
  const [imgName, imgSrc] = currentImage ?? [];
  const name = imgName?.replaceAll('_', ' ');

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
        {spriteEntries.map(([key, sprite], idx) =>
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
