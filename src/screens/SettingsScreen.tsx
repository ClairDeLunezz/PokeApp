import React from 'react';
import { View, Text, Switch, ScrollView, Linking, StyleSheet } from 'react-native';
import { useTheme } from '../services/ThemeContext';
import { useFavorites } from '../services/FavoritesContext';
import Logo from '../components/Logo/Logo';
import Menu from '../components/Menu/Menu';

const SettingsScreen: React.FC = () => {
  const { colors, isDark, toggleTheme } = useTheme();
  const { favorites } = useFavorites();

  const infoItems = [
    {
      label: 'Documentação da PokeAPI',
      icon: 'globe-outline' as const,
      onPress: () => Linking.openURL('https://pokeapi.co/docs/v2'),
    },
    {
      label: 'Repositório no GitHub',
      icon: 'logo-github' as const,
      onPress: () => Linking.openURL('https://github.com'),
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <View style={styles.logoWrapper}>
        <Logo size="large" />
        <Text style={[styles.version, { color: colors.textSecondary }]}>v1.0.0</Text>
      </View>

      {/* Stats */}
      <View style={[styles.statsCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statVal, { color: colors.primary }]}>{favorites.length}</Text>
          <Text style={[styles.statLbl, { color: colors.textSecondary }]}>Favoritos</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statVal, { color: colors.primary }]}>898</Text>
          <Text style={[styles.statLbl, { color: colors.textSecondary }]}>Pokémons</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statVal, { color: colors.primary }]}>18</Text>
          <Text style={[styles.statLbl, { color: colors.textSecondary }]}>Tipos</Text>
        </View>
      </View>

      {/* Tema */}
      <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>APARÊNCIA</Text>
      <View style={[styles.themeRow, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.themeLabel, { color: colors.text }]}>
          {isDark ? '🌙 Modo Escuro' : '☀️ Modo Claro'}
        </Text>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor="#FFFFFF"
        />
      </View>

      {/* Info */}
      <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>INFORMAÇÕES</Text>
      <Menu items={infoItems} />

      <Text style={[styles.footer, { color: colors.textSecondary }]}>
        Dados fornecidos pela PokeAPI · pokeapi.co
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  logoWrapper: { alignItems: 'center', paddingVertical: 24 },
  version: { fontSize: 12, marginTop: 4 },
  statsCard: {
    flexDirection: 'row',
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    marginBottom: 24,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statVal: { fontSize: 24, fontWeight: '900' },
  statLbl: { fontSize: 12, marginTop: 4 },
  statDivider: { width: 1, marginHorizontal: 8 },
  sectionLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: 8, marginTop: 8 },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 24,
  },
  themeLabel: { fontSize: 15, fontWeight: '500' },
  footer: { fontSize: 12, textAlign: 'center', marginTop: 24 },
});

export default SettingsScreen;
