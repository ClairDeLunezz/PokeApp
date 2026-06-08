import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../services/ThemeContext';

interface MenuItem {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

interface Props {
  items: MenuItem[];
}

const Menu: React.FC<Props> = ({ items }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      {items.map((item, index) => (
        <TouchableOpacity
          key={item.label}
          style={[
            styles.item,
            index < items.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
          ]}
          onPress={item.onPress}
          activeOpacity={0.7}
        >
          <Ionicons name={item.icon} size={22} color={colors.primary} />
          <Text style={[styles.label, { color: colors.text }]}>{item.label}</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 15,
    gap: 12,
  },
  label: { flex: 1, fontSize: 15, fontWeight: '500' },
});

export default Menu;
