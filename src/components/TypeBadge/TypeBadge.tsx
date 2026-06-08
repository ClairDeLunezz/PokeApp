import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TYPE_COLORS: Record<string, string> = {
  normal: '#A8A878', fire: '#F08030', water: '#6890F0',
  electric: '#F8D030', grass: '#78C850', ice: '#98D8D8',
  fighting: '#C03028', poison: '#A040A0', ground: '#E0C068',
  flying: '#A890F0', psychic: '#F85888', bug: '#A8B820',
  rock: '#B8A038', ghost: '#705898', dragon: '#7038F8',
  dark: '#705848', steel: '#B8B8D0', fairy: '#EE99AC',
};

export const getTypeColor = (type: string) => TYPE_COLORS[type] ?? '#A8A878';

interface Props {
  type: string;
}

const TypeBadge: React.FC<Props> = ({ type }) => (
  <View style={[styles.badge, { backgroundColor: getTypeColor(type) }]}>
    <Text style={styles.text}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 6,
  },
  text: { color: '#FFF', fontSize: 13, fontWeight: '700' },
});

export default TypeBadge;
