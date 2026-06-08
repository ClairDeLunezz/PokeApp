import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../services/ThemeContext';

interface Props extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const InputPassword: React.FC<Props> = ({ value, onChangeText, ...rest }) => {
  const [visible, setVisible] = useState(false);
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <TextInput
        style={[styles.input, { color: colors.text }]}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!visible}
        placeholderTextColor={colors.textSecondary}
        {...rest}
      />
      <TouchableOpacity onPress={() => setVisible((v) => !v)}>
        <Ionicons
          name={visible ? 'eye-off-outline' : 'eye-outline'}
          size={22}
          color={colors.textSecondary}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  input: { flex: 1, fontSize: 15 },
});

export default InputPassword;
