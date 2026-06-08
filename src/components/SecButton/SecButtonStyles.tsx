import { StyleSheet } from 'react-native';

export const SecButtonStyles = StyleSheet.create({
  btn: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { fontSize: 15, fontWeight: '700', letterSpacing: 0.3 },
  disabled: { opacity: 0.5 },
});
