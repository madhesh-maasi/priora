import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { colors, spacing, typography } from '@/theme';

interface QuickAddSubtaskProps {
  onAdd: (title: string, description?: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export const QuickAddSubtask: React.FC<QuickAddSubtaskProps> = ({
  onAdd,
  isLoading = false,
  placeholder = 'Add a subtask...',
}) => {
  const [title, setTitle] = useState('');

  const handleAdd = () => {
    if (title.trim()) {
      onAdd(title);
      setTitle('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.text.tertiary}
        value={title}
        onChangeText={setTitle}
        editable={!isLoading}
      />
      <TouchableOpacity
        style={[styles.addButton, isLoading && styles.addButtonDisabled]}
        onPress={handleAdd}
        disabled={isLoading || !title.trim()}
      >
        <Text style={styles.addIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing[2],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    backgroundColor: colors.bg.secondary,
    borderRadius: spacing[2],
    marginHorizontal: spacing[3],
    marginVertical: spacing[2],
  },
  input: {
    flex: 1,
    ...typography.styles.bodySm,
    color: colors.text.primary,
    backgroundColor: colors.bg.primary,
    borderRadius: spacing[1],
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderWidth: 1,
    borderColor: colors.neutral[300],
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: colors.neutral[300],
  },
  addIcon: {
    fontSize: 18,
    color: colors.bg.primary,
    fontWeight: 'bold',
  },
});
