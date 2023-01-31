import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  Pokemon,
  PokemonWithLimit,
  ResourceFor,
  NamedAPIResource,
} from '../types';
import { PokemonUtils } from '../utils/pokemon';

export function usePokemon(limit: number, offset: number): NamedAPIResource[];
export function usePokemon(url: string): Pokemon;

export function usePokemon(
  arg1: number | string,
  arg2?: number
): NamedAPIResource[] | Pokemon | null {
  const [pokemon, setPokemon] = useState<
    Pokemon | PokemonWithLimit['results'] | null
  >([]);

  useEffect(() => {
    const getPokemon = async () => {
      if (typeof arg1 === 'string') {
        const { data } = await axios.get<Pokemon>(arg1);

        setPokemon(data);
      } else {
        const { results } = await PokemonUtils.getResource(
          'pokemon',
          arg1,
          arg2
        );

        setPokemon(results);
      }
    };

    getPokemon();
  }, []);

  return pokemon;
}
