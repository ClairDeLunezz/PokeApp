import { StyleSheet } from 'react-native';

export const MenuStyles = StyleSheet.create({
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
