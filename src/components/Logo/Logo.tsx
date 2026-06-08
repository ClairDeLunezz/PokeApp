import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../services/ThemeContext';

interface Props {
  size?: 'small' | 'large';
}

const Logo: React.FC<Props> = ({ size = 'large' }) => {
  const { colors } = useTheme();
  const fs = size === 'large' ? 32 : 20;

  return (
    <View style={styles.container}>
      <Text style={[styles.poke, { fontSize: fs, color: colors.text }]}>Poké</Text>
      <Text style={[styles.dex, { fontSize: fs, color: colors.primary }]}>App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  poke: { fontWeight: '900', letterSpacing: -0.5 },
  dex: { fontWeight: '900', letterSpacing: -0.5 },
});

export default Logo;
