import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { PokemonListItem } from '../../services/pokemonService';
import { useTheme } from '../../services/ThemeContext';

interface Props {
  pokemon: PokemonListItem;
  onPress: (pokemon: PokemonListItem) => void;
}

const PokemonCard: React.FC<Props> = ({ pokemon, onPress }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={() => onPress(pokemon)}
      activeOpacity={0.75}
    >
      <Image source={{ uri: pokemon.sprite }} style={styles.image} resizeMode="contain" />
      <Text style={[styles.number, { color: colors.textSecondary }]}>
        #{String(pokemon.id).padStart(3, '0')}
      </Text>
      <Text style={[styles.name, { color: colors.text }]}>
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  image: { width: 90, height: 90 },
  number: { fontSize: 12, fontWeight: '600', marginTop: 8 },
  name: { fontSize: 14, fontWeight: '700', marginTop: 2 },
});

export default PokemonCard;
