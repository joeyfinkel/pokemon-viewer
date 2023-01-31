import { tagAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { TypeOptions } from '../types';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tagAnatomy.keys);

const colors: { [x in TypeOptions]: string } = {
  water: '#1AAFE1',
  fire: '#F5A623',
  grass: '#5FBD58',
  bug: '#92BC2C',
  normal: '#A0A29F',
  dark: '#595761',
  dragon: '#0C69C8',
  electric: '#F2D94E',
  fairy: '#EE90E6',
  fighting: '#D3425F',
  flying: '#A1BBEC',
  ghost: '#5F6DBC',
  ground: '#DA7C4D',
  ice: '#75D0C1',
  poison: '#B763CF',
  psychic: '#FA8581',
  rock: '#C9BB8A',
  shadow: '#595761',
  steel: '#5695A3',
  unknown: '#A0A29F',
};

const theme = Object.entries(colors)
  .map(([key, value]) => {
    return {
      [key]: definePartsStyle({
        container: {
          bg: value,
          color: 'blackAlpha.700',
        },
      }),
    };
  })
  .reduce((acc, post) => {
    const key = Object.keys(post)[0];
    acc[key] = post[key];
    return acc;
  });

export const tagTheme = defineMultiStyleConfig({
  variants: {
    ...theme,
  },
});
