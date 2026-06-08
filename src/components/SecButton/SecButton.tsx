import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../services/ThemeContext';

interface Props {
  title: string;
  onPress: () => void;
  loading?: boolean;
  variant?: 'primary' | 'outline' | 'danger';
  style?: ViewStyle;
  disabled?: boolean;
}

const SecButton: React.FC<Props> = ({
  title, onPress, loading = false,
  variant = 'primary', style, disabled = false,
}) => {
  const { colors } = useTheme();

  const bg =
    variant === 'danger' ? '#EF4444' :
    variant === 'outline' ? 'transparent' :
    colors.primary;

  const textColor = variant === 'outline' ? colors.primary : '#FFF';

  return (
    <TouchableOpacity
      style={[
        styles.btn,
        { backgroundColor: bg },
        variant === 'outline' && { borderWidth: 2, borderColor: colors.primary },
        (disabled || loading) && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading
        ? <ActivityIndicator color={textColor} size="small" />
        : <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

export default SecButton;
