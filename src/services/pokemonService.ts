import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 10000,
});

export interface PokemonListItem {
  id: number;
  name: string;
  url: string;
  sprite: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string;
    other: { 'official-artwork': { front_default: string } };
  };
  types: Array<{ slot: number; type: { name: string } }>;
  stats: Array<{ base_stat: number; stat: { name: string } }>;
  abilities: Array<{ ability: { name: string }; is_hidden: boolean }>;
}

export const fetchPokemonList = async (
  limit = 20,
  offset = 0
): Promise<PokemonListItem[]> => {
  const { data } = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
  return data.results.map((p: { name: string; url: string }) => {
    const id = parseInt(p.url.split('/').filter(Boolean).pop() || '0');
    return {
      id,
      name: p.name,
      url: p.url,
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    };
  });
};

export const fetchPokemonDetail = async (
  idOrName: number | string
): Promise<PokemonDetail> => {
  const { data } = await api.get(`/pokemon/${idOrName}`);
  return data;
};

export const searchPokemon = async (
  query: string
): Promise<PokemonDetail | null> => {
  try {
    const { data } = await api.get(`/pokemon/${query.toLowerCase().trim()}`);
    return data;
  } catch {
    return null;
  }
};
