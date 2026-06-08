import { StyleSheet } from 'react-native';

export const HomeStyles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 8 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
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
});
