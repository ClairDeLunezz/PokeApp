import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TextInput, StyleSheet,
  ActivityIndicator, TouchableOpacity, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import PokemonCard from '../components/PokemonCard/PokemonCard';
import { useTheme } from '../services/ThemeContext';
import { fetchPokemonList, searchPokemon, PokemonListItem } from '../services/pokemonService';
import { RootStackParamList } from '../services/navigationTypes';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Tabs'>;

const PAGE = 20;

const HomeScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<Nav>();

  
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState<PokemonListItem | null>(null);
  const [searching, setSearching] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);

 
  useEffect(() => {
    load(0, true);
  }, []);

  const load = async (currentOffset: number, reset = false) => {
    try {
      reset ? setLoading(true) : setLoadingMore(true);
      setError(null);
      const data = await fetchPokemonList(PAGE, currentOffset);
      if (data.length < PAGE) setHasMore(false);
      setPokemons((prev) => (reset ? data : [...prev, ...data]));
      setOffset(currentOffset + PAGE);
    } catch {
      setError('Não foi possível carregar. Verifique sua conexão.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) { clearSearch(); return; }
    setSearching(true);
    setIsSearchMode(true);
    const result = await searchPokemon(query);
    if (result) {
      setSearchResult({
        id: result.id,
        name: result.name,
        url: `https://pokeapi.co/api/v2/pokemon/${result.id}/`,
        sprite: result.sprites.other['official-artwork'].front_default || result.sprites.front_default,
      });
    } else {
      setSearchResult(null);
      Alert.alert('Não encontrado', `"${query}" não foi encontrado.`);
    }
    setSearching(false);
  };

  const clearSearch = () => {
    setQuery('');
    setSearchResult(null);
    setIsSearchMode(false);
  };

  const handlePress = (pokemon: PokemonListItem) =>
    navigation.navigate('Detail', { pokemonId: pokemon.id, pokemonName: pokemon.name });

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
          Carregando Pokédex...
        </Text>
      </View>
    );
  }

  if (error && pokemons.length === 0) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Ionicons name="wifi-outline" size={48} color={colors.textSecondary} />
        <Text style={[styles.errorText, { color: colors.text }]}>{error}</Text>
        <TouchableOpacity
          style={[styles.retryBtn, { backgroundColor: colors.primary }]}
          onPress={() => load(0, true)}
        >
          <Text style={styles.retryText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const displayData = isSearchMode ? (searchResult ? [searchResult] : []) : pokemons;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Barra de busca */}
      <View style={[styles.searchBar, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Ionicons name="search-outline" size={20} color={colors.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Buscar por nome ou número..."
          placeholderTextColor={colors.textSecondary}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        {searching
          ? <ActivityIndicator size="small" color={colors.primary} />
          : query.length > 0
            ? <TouchableOpacity onPress={clearSearch}>
                <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            : null}
      </View>

      {isSearchMode && (
        <TouchableOpacity onPress={clearSearch} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={16} color={colors.primary} />
          <Text style={[styles.backText, { color: colors.primary }]}>Voltar à lista</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={displayData}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        renderItem={({ item }) => <PokemonCard pokemon={item} onPress={handlePress} />}
        contentContainerStyle={styles.list}
        onEndReached={() => {
          if (!isSearchMode && hasMore && !loadingMore) load(offset);
        }}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          loadingMore ? <ActivityIndicator style={styles.footer} color={colors.primary} /> : null
        }
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              Nenhum resultado encontrado.
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  list: { padding: 8 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    gap: 8,
  },
  searchInput: { flex: 1, fontSize: 14 },
  loadingText: { marginTop: 12, fontSize: 14 },
  errorText: { fontSize: 15, textAlign: 'center', marginTop: 12, marginBottom: 20 },
  retryBtn: { paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  retryText: { color: '#FFF', fontWeight: '700' },
  footer: { paddingVertical: 20 },
  backBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 8, gap: 4 },
  backText: { fontSize: 14, fontWeight: '600' },
  emptyText: { fontSize: 15, marginTop: 40 },
});

export default HomeScreen;
