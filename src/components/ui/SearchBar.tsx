import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import { colors, spacing, typography } from '@/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
  onSubmit?: () => void;
  disabled?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search...',
  onClear,
  onSubmit,
  disabled = false,
}) => (
  <View style={styles.container}>
    <Text style={styles.icon}>🔍</Text>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={colors.text.tertiary}
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmit}
      editable={!disabled}
      returnKeyType="search"
    />
    {value && !disabled && (
      <TouchableOpacity
        onPress={() => {
          onChangeText('');
          onClear?.();
        }}
        style={styles.clearButton}
      >
        <Text style={styles.clearIcon}>✕</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    backgroundColor: colors.bg.secondary,
    borderRadius: spacing[3],
    borderWidth: 1,
    borderColor: colors.neutral[300],
  },
  icon: {
    fontSize: 18,
    marginRight: spacing[2],
    color: colors.text.secondary,
  },
  input: {
    flex: 1,
    ...typography.styles.body,
    color: colors.text.primary,
    padding: 0,
  },
  clearButton: {
    padding: spacing[1],
    marginLeft: spacing[2],
  },
  clearIcon: {
    fontSize: 16,
    color: colors.text.secondary,
    fontWeight: '600',
  },
});
