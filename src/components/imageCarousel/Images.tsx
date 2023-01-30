import { Image, ImageProps, Tooltip } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Entries, PokemonSprites } from '../../types';

interface Props extends Pick<ImageProps, 'onClick'> {
  currentImageName: string;
  entries: Entries<PokemonSprites>;
  name: string | undefined;
}

export const Images: React.FC<Props> = ({
  entries,
  currentImageName,
  name,
  onClick,
}) => {
  const [color, setColor] = useState<ImageProps['bgColor']>('');
  const [key, sprite] = entries;

  return (
    <Tooltip
      label={name?.replaceAll('_', ' ')}
      openDelay={500}
      closeDelay={300}
    >
      <Image
        objectFit='cover'
        maxW={{ base: '100%', sm: '200px' }}
        src={sprite}
        alt={key}
        role='button'
        loading='lazy'
        onClick={onClick}
        borderRadius='1rem'
        bgColor={key === currentImageName ? 'gray.100' : color}
        onMouseEnter={() => setColor('gray.100')}
        onMouseLeave={() => setColor('')}
      />
    </Tooltip>
  );
};
