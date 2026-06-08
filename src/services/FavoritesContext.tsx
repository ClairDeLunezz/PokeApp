import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
} from 'react';
import { PokemonListItem } from './pokemonService';


interface State {
  favorites: PokemonListItem[];
}

type Action =
  | { type: 'ADD'; payload: PokemonListItem }
  | { type: 'REMOVE'; payload: number }
  | { type: 'CLEAR' };


function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD':
      if (state.favorites.some((p) => p.id === action.payload.id)) return state;
      return { favorites: [...state.favorites, action.payload] };
    case 'REMOVE':
      return { favorites: state.favorites.filter((p) => p.id !== action.payload) };
    case 'CLEAR':
      return { favorites: [] };
    default:
      return state;
  }
}


interface FavoritesContextData {
  favorites: PokemonListItem[];
  addFavorite: (p: PokemonListItem) => void;
  removeFavorite: (id: number) => void;
  clearAll: () => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextData>({} as FavoritesContextData);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, { favorites: [] });

  return (
    <FavoritesContext.Provider
      value={{
        favorites: state.favorites,
        addFavorite: (p) => dispatch({ type: 'ADD', payload: p }),
        removeFavorite: (id) => dispatch({ type: 'REMOVE', payload: id }),
        clearAll: () => dispatch({ type: 'CLEAR' }),
        isFavorite: (id) => state.favorites.some((p) => p.id === id),
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
