import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  Pokemon,
  PokemonWithLimit,
  ResourceFor,
  NamedAPIResource,
} from '../types';

export function usePokemon(
  limit: number,
  offset: number
): ResourceFor['results'];
export function usePokemon(url: string): Pokemon;

export function usePokemon(
  arg1: number | string = 50,
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
        const { data } = await axios.get<ResourceFor>(
          `https://pokeapi.co/api/v2/pokemon?limit=${arg1}&offset=${arg2}`
        );

        setPokemon(data.results);
      }
    };

    getPokemon();
  }, []);

  return pokemon;
}
