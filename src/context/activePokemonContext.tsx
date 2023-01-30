import React, { createContext, useContext, useState } from 'react';
import { Pokemon } from '../types';

interface IActivePokemonContext {
  active: boolean;
  setActive?: React.Dispatch<React.SetStateAction<boolean>>;

  activePokemon?: Pokemon | null;
  setActivePokemon?: React.Dispatch<React.SetStateAction<Pokemon | null>>;
}

interface IActivePokemonContextProvider
  extends Required<Pick<IActivePokemonContext, 'active' | 'setActive'>> {
  children: React.ReactNode;
}

const ActivePokemonContext = createContext<IActivePokemonContext>({
  active: false,
});

export const ActivePokemonContextProvider = ({
  children,
  active,
  setActive,
}: IActivePokemonContextProvider) => {
  const [activePokemon, setActivePokemon] = useState<Pokemon | null>(null);

  return (
    <ActivePokemonContext.Provider
      value={{
        active,
        setActive,
        activePokemon,
        setActivePokemon,
      }}
    >
      {children}{' '}
    </ActivePokemonContext.Provider>
  );
};

export const useActivePokemon = () => {
  const context = useContext(ActivePokemonContext);

  if (context === undefined) {
    throw new Error(
      'useActivePokemon must be used within a ActivePokemonContextProvider'
    );
  }

  return context;
};
