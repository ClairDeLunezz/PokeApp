import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useTheme } from '../services/ThemeContext';
import { useFavorites } from '../services/FavoritesContext';
import PokemonCard from '../components/PokemonCard/PokemonCard';
import { PokemonListItem } from '../services/pokemonService';
import { RootStackParamList } from '../services/navigationTypes';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Tabs'>;

const FavoritesScreen: React.FC = () => {
  const { colors } = useTheme();
  const { favorites, clearAll } = useFavorites();
  const navigation = useNavigation<Nav>();

  const handlePress = (pokemon: PokemonListItem) =>
    navigation.navigate('Detail', { pokemonId: pokemon.id, pokemonName: pokemon.name });

  const confirmClear = () =>
    Alert.alert('Limpar favoritos', 'Remover todos os favoritos?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Remover', style: 'destructive', onPress: clearAll },
    ]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {favorites.length > 0 && (
        <View style={styles.header}>
          <Text style={[styles.count, { color: colors.textSecondary }]}>
            {favorites.length} favorito{favorites.length !== 1 ? 's' : ''}
          </Text>
          <TouchableOpacity onPress={confirmClear}>
            <Text style={[styles.clearBtn, { color: colors.primary }]}>Limpar tudo</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={favorites}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        renderItem={({ item }) => <PokemonCard pokemon={item} onPress={handlePress} />}
        contentContainerStyle={favorites.length === 0 ? styles.emptyContainer : styles.list}
        ListEmptyComponent={
          <View style={styles.emptyWrapper}>
            <Ionicons name="heart-outline" size={64} color={colors.border} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>Nenhum favorito ainda</Text>
            <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
              Toque no ♥ na página do Pokémon para favoritar.
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 8 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  count: { fontSize: 14 },
  clearBtn: { fontSize: 14, fontWeight: '600' },
  emptyContainer: { flexGrow: 1 },
  emptyWrapper: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40, gap: 12 },
  emptyTitle: { fontSize: 20, fontWeight: '700', textAlign: 'center' },
  emptySubtitle: { fontSize: 14, textAlign: 'center', lineHeight: 22 },
});

export default FavoritesScreen;
