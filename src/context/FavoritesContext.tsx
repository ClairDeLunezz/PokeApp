import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
} from 'react';
import { PokemonListItem } from '../services/pokemonService';

// --- State & Actions ---
interface FavoritesState {
  favorites: PokemonListItem[];
}

type FavoritesAction =
  | { type: 'ADD_FAVORITE'; payload: PokemonListItem }
  | { type: 'REMOVE_FAVORITE'; payload: number }
  | { type: 'CLEAR_ALL' };

// --- Reducer (useReducer requirement) ---
const favoritesReducer = (
  state: FavoritesState,
  action: FavoritesAction
): FavoritesState => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      if (state.favorites.find((p) => p.id === action.payload.id)) {
        return state; // already favorited
      }
      return { favorites: [...state.favorites, action.payload] };

    case 'REMOVE_FAVORITE':
      return {
        favorites: state.favorites.filter((p) => p.id !== action.payload),
      };

    case 'CLEAR_ALL':
      return { favorites: [] };

    default:
      return state;
  }
};

// --- Context ---
interface FavoritesContextData {
  favorites: PokemonListItem[];
  addFavorite: (pokemon: PokemonListItem) => void;
  removeFavorite: (id: number) => void;
  clearAll: () => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextData>(
  {} as FavoritesContextData
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(favoritesReducer, { favorites: [] });

  const addFavorite = (pokemon: PokemonListItem) =>
    dispatch({ type: 'ADD_FAVORITE', payload: pokemon });

  const removeFavorite = (id: number) =>
    dispatch({ type: 'REMOVE_FAVORITE', payload: id });

  const clearAll = () => dispatch({ type: 'CLEAR_ALL' });

  const isFavorite = (id: number) =>
    state.favorites.some((p) => p.id === id);

  return (
    <FavoritesContext.Provider
      value={{
        favorites: state.favorites,
        addFavorite,
        removeFavorite,
        clearAll,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error('useFavorites must be used within FavoritesProvider');
  return context;
};
