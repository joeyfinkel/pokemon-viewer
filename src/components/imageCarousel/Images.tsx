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
    <Tooltip label={name} openDelay={500} closeDelay={300}>
      <Image
        objectFit='cover'
        maxW={{ base: '100%', sm: '200px' }}
        src={sprite}
        alt={key}
        role='button'
        loading='lazy'
        onClick={onClick}
        border={key === currentImageName ? '1px solid black' : ''}
        borderRadius='1rem'
        bgColor={color}
        onMouseEnter={() => setColor('gray.100')}
        onMouseLeave={() => setColor('')}
      />
    </Tooltip>
  );
};
