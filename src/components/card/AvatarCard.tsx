import { CardProps } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useActivePokemon } from '../../context/activePokemonContext';
import { useCurrentParams } from '../../hooks/useCurrentParams';
import { Pokemon } from '../../types';
import { BaseAvatarCard } from './BaseAvatarCard';

interface Props extends CardProps {
  url: string;
}

export const PokemonAvatarCard: React.FC<Props> = ({
  url,
  height,
  width,
  ...rest
}) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [color, setColor] = useState<CardProps['bgColor']>('gray.400');
  const [params, setParams] = useSearchParams();

  const { activePokemon, setActivePokemon } = useActivePokemon();

  const currentParams = useCurrentParams(true);

  const activeColor = 'gray.500';

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActivePokemon?.(pokemon);

    if (params.has('id')) {
      if (pokemon?.id) {
        const { id } = pokemon;
        const newParams = new URLSearchParams({
          ...currentParams,
          id: id.toString(),
        });

        setParams(newParams);
      }
    }
  };

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get<Pokemon>(url);

      setPokemon(data);
    };

    getData();
  }, []);

  return (
    <BaseAvatarCard
      pokemon={pokemon}
      maxW={width}
      maxH={height}
      bgColor={activePokemon?.id === pokemon?.id ? activeColor : color}
      onClick={onClick}
      onMouseEnter={() => setColor(activeColor)}
      onMouseLeave={() => setColor('gray.400')}
      {...rest}
    />
  );
};
