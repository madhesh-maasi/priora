import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { EmptyState } from '@/components/feedback/EmptyState';
import { colors, spacing, typography } from '@/theme';

export const UpcomingTasksScreen: React.FC = () => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>Upcoming Tasks</Text>
    </View>
    <EmptyState
      icon="🚀"
      title="No upcoming tasks"
      description="Plan ahead by adding tasks with future due dates."
      actionLabel="Add Task"
      onAction={() => {}}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg.primary },
  header: { padding: spacing[4], backgroundColor: colors.primary[50] },
  title: { ...typography.styles.h2, color: colors.text.primary },
});
