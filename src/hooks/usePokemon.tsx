import axios from 'axios';
import { useState, useEffect } from 'react';

export const usePokemon = () => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const getPokemon = async () => {
      const data = await axios.get(
        'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
      );

      setPokemon(data.data.results);
    };

    getPokemon();
  }, []);

  return pokemon;
};
