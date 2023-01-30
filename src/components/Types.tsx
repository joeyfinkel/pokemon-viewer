import { Tag } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { PokemonType } from '../types';

interface Props {
  resource: PokemonType;
}

export const Types: React.FC<Props> = ({ resource }) => {
  const type = useMemo(() => resource.type.name, []);

  return <Tag>{type}</Tag>;
};
