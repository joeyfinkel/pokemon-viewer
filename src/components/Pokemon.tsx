import { useEffect } from 'react';
import axios from 'axios';
import { usePokemon } from '../hooks/usePokemon';

export const Pokemon = () => {
  const pokemon = usePokemon();

  useEffect(() => {
    const get = async () => {
      const data = await axios.get(
        'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
      );

      console.log(data.data);
    };

    get();
  }, []);

  return (
    <>
      {pokemon.map((character) => (
        <p>{character?.name}</p>
      ))}
    </>
  );
};
