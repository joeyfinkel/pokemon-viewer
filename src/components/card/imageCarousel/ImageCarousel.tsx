import { Flex, Icon, IconButton, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Entries, Pokemon, PokemonSprites } from '../../../types';
import { capitalizeWord } from '../../../utils/utils';
import { Images } from './Images';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { ImageChooser } from './ImageChooser';

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
      justify={{ sm: 'flex-end', xl: 'space-between' }}
      border='1px solid black'
      borderRadius='1rem'
      grow='1'
    >
      <Flex direction='column' align='center'>
        <Image
          objectFit='cover'
          height={{ base: '100%', sm: 100, xl: 300 }}
          src={imgSrc}
          style={{ imageRendering: 'pixelated' }}
          loading='lazy'
        />
        <Text fontWeight='bold'>{capitalizeWord(name ?? '')}</Text>
      </Flex>

      {entries.length > 4 ? (
        <Flex justify='space-around' align='center'>
          <IconButton
            aria-label='Left'
            icon={<FaAngleLeft />}
            variant='ghost'
          />
          <ImageChooser
            entries={entries.slice(0, 4)}
            imgName={imgName}
            setCurrentImage={setCurrentImage}
          />
          <IconButton
            aria-label='Right'
            icon={<FaAngleRight />}
            variant='ghost'
          />
        </Flex>
      ) : (
        <ImageChooser
          entries={entries}
          imgName={imgName}
          setCurrentImage={setCurrentImage}
        />
      )}
    </Flex>
  );
};
