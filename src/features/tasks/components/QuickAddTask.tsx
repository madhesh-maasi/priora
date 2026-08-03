import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { colors, spacing, typography } from '@/theme';

interface QuickAddTaskProps {
  onAdd: (title: string, priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL') => void;
  isLoading?: boolean;
}

export const QuickAddTask: React.FC<QuickAddTaskProps> = ({ onAdd, isLoading = false }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'MEDIUM'>('MEDIUM');

  const handleAdd = () => {
    if (title.trim()) {
      onAdd(title, priority);
      setTitle('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a new task..."
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
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    backgroundColor: colors.bg.secondary,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  input: {
    flex: 1,
    ...typography.styles.body,
    color: colors.text.primary,
    backgroundColor: colors.bg.primary,
    borderRadius: spacing[2],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderWidth: 1,
    borderColor: colors.neutral[300],
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: colors.neutral[300],
  },
  addIcon: {
    fontSize: 24,
    color: colors.bg.primary,
    fontWeight: 'bold',
  },
});
