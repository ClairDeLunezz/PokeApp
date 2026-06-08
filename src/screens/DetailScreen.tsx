import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, ScrollView, StyleSheet,
  ActivityIndicator, TouchableOpacity,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../services/ThemeContext';
import { useFavorites } from '../services/FavoritesContext';
import { fetchPokemonDetail, PokemonDetail } from '../services/pokemonService';
import TypeBadge, { getTypeColor } from '../components/TypeBadge/TypeBadge';
import { RootStackParamList } from '../services/navigationTypes';

type DetailRoute = RouteProp<RootStackParamList, 'Detail'>;

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const STAT_NAMES: Record<string, string> = {
  hp: 'HP', attack: 'ATK', defense: 'DEF',
  'special-attack': 'SpATK', 'special-defense': 'SpDEF', speed: 'SPD',
};

const DetailScreen: React.FC = () => {
  const route = useRoute<DetailRoute>();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const { pokemonId, pokemonName } = route.params;

 
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchPokemonDetail(pokemonId);
        setPokemon(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [pokemonId]);

  const favorited = pokemon ? isFavorite(pokemon.id) : false;

  const toggleFavorite = () => {
    if (!pokemon) return;
    const item = {
      id: pokemon.id,
      name: pokemon.name,
      url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`,
      sprite: pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default,
    };
    favorited ? removeFavorite(pokemon.id) : addFavorite(item);
  };

  const bgColor = pokemon?.types[0] ? getTypeColor(pokemon.types[0].type.name) : colors.primary;

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error || !pokemon) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Ionicons name="alert-circle-outline" size={48} color={colors.textSecondary} />
        <Text style={[styles.errorText, { color: colors.text }]}>
          Erro ao carregar {cap(pokemonName)}.
        </Text>
        <TouchableOpacity
          style={[styles.retryBtn, { backgroundColor: colors.primary }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.retryText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
     
      <View style={[styles.hero, { backgroundColor: bgColor }]}>
        <View style={styles.heroTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleFavorite} style={styles.iconBtn}>
            <Ionicons name={favorited ? 'heart' : 'heart-outline'} size={26} color="#FFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.heroNum}>#{String(pokemon.id).padStart(3, '0')}</Text>
        <Text style={styles.heroName}>{cap(pokemon.name)}</Text>
        <View style={styles.typesRow}>
          {pokemon.types.map((t) => <TypeBadge key={t.type.name} type={t.type.name} />)}
        </View>
        <Image
          source={{ uri: pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default }}
          style={styles.heroImage}
          resizeMode="contain"
        />
      </View>

      
      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Informações</Text>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={[styles.infoVal, { color: colors.text }]}>{(pokemon.height / 10).toFixed(1)} m</Text>
            <Text style={[styles.infoLbl, { color: colors.textSecondary }]}>Altura</Text>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.infoItem}>
            <Text style={[styles.infoVal, { color: colors.text }]}>{(pokemon.weight / 10).toFixed(1)} kg</Text>
            <Text style={[styles.infoLbl, { color: colors.textSecondary }]}>Peso</Text>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.infoItem}>
            <Text style={[styles.infoVal, { color: colors.text }]}>{pokemon.base_experience ?? '—'}</Text>
            <Text style={[styles.infoLbl, { color: colors.textSecondary }]}>Exp. Base</Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Habilidades</Text>
        <View style={styles.abilitiesRow}>
          {pokemon.abilities.map((a) => (
            <View key={a.ability.name} style={[styles.chip, { backgroundColor: colors.background }]}>
              <Text style={[styles.chipText, { color: colors.text }]}>
                {cap(a.ability.name.replace('-', ' '))}{a.is_hidden ? ' (Oculta)' : ''}
              </Text>
            </View>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Estatísticas Base</Text>
        {pokemon.stats.map((s) => (
          <View key={s.stat.name} style={styles.statRow}>
            <Text style={[styles.statName, { color: colors.textSecondary }]}>
              {STAT_NAMES[s.stat.name] ?? s.stat.name.toUpperCase()}
            </Text>
            <Text style={[styles.statVal, { color: colors.text }]}>{s.base_stat}</Text>
            <View style={[styles.barBg, { backgroundColor: colors.border }]}>
              <View style={[styles.barFill, { backgroundColor: bgColor, width: `${(s.base_stat / 255) * 100}%` }]} />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  hero: { paddingTop: 60, paddingBottom: 80, paddingHorizontal: 20, alignItems: 'center' },
  heroTop: {
    position: 'absolute', top: 16, left: 16, right: 16,
    flexDirection: 'row', justifyContent: 'space-between', zIndex: 10,
  },
  iconBtn: { padding: 8 },
  heroNum: { color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: '700', marginTop: 20 },
  heroName: { color: '#FFF', fontSize: 34, fontWeight: '900', marginTop: 4 },
  typesRow: { flexDirection: 'row', marginTop: 10, marginBottom: 16 },
  heroImage: { width: 200, height: 200 },
  card: { marginTop: -30, borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, minHeight: 400 },
  sectionTitle: { fontSize: 16, fontWeight: '800', marginBottom: 12, marginTop: 20 },
  infoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingVertical: 16 },
  infoItem: { alignItems: 'center', flex: 1 },
  infoVal: { fontSize: 18, fontWeight: '700' },
  infoLbl: { fontSize: 12, marginTop: 4 },
  divider: { width: 1, height: 40 },
  abilitiesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  chipText: { fontSize: 13, fontWeight: '600' },
  statRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
  statName: { width: 58, fontSize: 12, fontWeight: '600' },
  statVal: { width: 36, fontSize: 13, fontWeight: '700', textAlign: 'right' },
  barBg: { flex: 1, height: 8, borderRadius: 4, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 4 },
  errorText: { fontSize: 15, textAlign: 'center', marginTop: 12, marginBottom: 20 },
  retryBtn: { paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  retryText: { color: '#FFF', fontWeight: '700' },
});

export default DetailScreen;
