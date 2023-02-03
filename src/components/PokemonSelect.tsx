import { Select } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCurrentParams } from '../hooks/useCurrentParams';
import { NamedAPIResource } from '../types';
import { PokemonUtils } from '../utils/pokemon';
import { VirtualizedList } from './VirtualizedList';

interface Props {
  pokemon: NamedAPIResource<string>[];
}

export const PokemonSelect: React.FC<Props> = ({ pokemon }) => {
  const [placeholder, setPlaceholder] = useState('Choose a pokemon');
  const [, setParams] = useSearchParams();
  const ref = React.useRef<HTMLSelectElement>(null);
  const params = useCurrentParams();

  const onClick = (name: string, idx: number) => {
    const { id: pId, ...rest } = params;
    const newParams = new URLSearchParams({
      ...rest,
      id: idx.toString(),
    });

    setParams(newParams);
    setPlaceholder(name);
  };

  useEffect(() => {
    const updatePlaceholder = () => {
      if (params.id) {
        const { id } = params;

        setPlaceholder(
          PokemonUtils.capitalizeName(pokemon[parseInt(id) - 1].name)
        );
      }
    };

    updatePlaceholder();
  }, [params.id]);

  return (
    <Select placeholder={placeholder} ref={ref}>
      <VirtualizedList data={pokemon} ref={ref}>
        {({ idx }) => {
          const { name } = pokemon[idx];

          return (
            <option onClick={() => onClick(name, idx + 1)}>
              {PokemonUtils.capitalizeName(name)}
            </option>
          );
        }}
      </VirtualizedList>
    </Select>
  );
};
