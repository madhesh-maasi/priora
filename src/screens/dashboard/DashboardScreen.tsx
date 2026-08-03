import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { EmptyState } from '@/components/feedback/EmptyState';
import { Card } from '@/components/ui/Card';
import { colors, spacing, typography } from '@/theme';
import { useAuth } from '@/features/auth';

export const DashboardScreen: React.FC = () => {
  const { user } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back, {user?.email}! 👋</Text>
        <Text style={styles.subtitle}>Here's what's on your plate today</Text>
      </View>

      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Your Tasks</Text>
        <Text style={styles.cardText}>View all your tasks and manage your workflow</Text>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Today's Schedule</Text>
        <Text style={styles.cardText}>See what you need to accomplish today</Text>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Upcoming Tasks</Text>
        <Text style={styles.cardText}>Plan ahead with your upcoming tasks</Text>
      </Card>

      <EmptyState
        icon="📊"
        title="Dashboard"
        description="Metrics and overview coming soon"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg.primary,
  },
  header: {
    padding: spacing[4],
    backgroundColor: colors.primary[50],
  },
  greeting: {
    ...typography.styles.h2,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  subtitle: {
    ...typography.styles.body,
    color: colors.text.secondary,
  },
  card: {
    margin: spacing[4],
  },
  cardTitle: {
    ...typography.styles.h4,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  cardText: {
    ...typography.styles.body,
    color: colors.text.secondary,
  },
});
