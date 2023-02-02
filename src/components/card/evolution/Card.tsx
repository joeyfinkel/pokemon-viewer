import { CardProps } from '@chakra-ui/react';
import React, { useState } from 'react';
import { usePokemon } from '../../../hooks/usePokemon';
import { BaseAvatarCard } from '../BaseAvatarCard';

interface Props extends Pick<CardProps, 'onClick'> {
  url: string;
  width: CardProps['maxW'];
  height: CardProps['maxH'];
}

export const EvolutionCard: React.FC<Props> = ({
  url,
  height,
  width,
  onClick,
}) => {
  const [color, setColor] = useState<CardProps['bgColor']>('gray.400');

  const pokemon = usePokemon(url);

  return (
    <BaseAvatarCard
      pokemon={pokemon}
      maxW={width}
      maxH={height}
      bgColor={color}
      onClick={onClick}
      onMouseEnter={() => setColor('gray.500')}
      onMouseLeave={() => setColor('gray.400')}
    />
  );
};
