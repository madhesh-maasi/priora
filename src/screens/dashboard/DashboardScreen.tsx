import React from 'react';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { EmptyState } from '@/components/feedback/EmptyState';
import { Skeleton, SkeletonGroup } from '@/components/feedback/Skeleton';
import { colors, spacing, typography } from '@/theme';
import { useAuth } from '@/features/auth';
import { useDashboardMetrics, useRecentTasks, useUpcomingTasks, useOverdueTasks } from '@/features/dashboard';
import { StatCard } from '@/features/dashboard/components/StatCard';
import { StreakCard } from '@/features/dashboard/components/StreakCard';
import { DashboardTaskCard } from '@/features/dashboard/components/DashboardTaskCard';
import { SectionHeader } from '@/features/dashboard/components/SectionHeader';

export const DashboardScreen: React.FC = () => {
  const { user } = useAuth();
  const { data: metrics, isLoading: metricsLoading } = useDashboardMetrics();
  const { data: recentTasks, isLoading: recentLoading } = useRecentTasks(3);
  const { data: upcomingTasks, isLoading: upcomingLoading } = useUpcomingTasks(7);
  const { data: overdueTasks } = useOverdueTasks();

  const isLoading = metricsLoading || recentLoading || upcomingLoading;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back, {user?.displayName || 'there'}! 👋</Text>
        <Text style={styles.subtitle}>Here's your task summary</Text>
      </View>

      {isLoading ? (
        <SkeletonGroup>
          <Skeleton height={100} style={styles.skeletonCard} />
          <Skeleton height={100} style={styles.skeletonCard} />
        </SkeletonGroup>
      ) : metrics ? (
        <View style={styles.section}>
          <View style={styles.statsGrid}>
            <View style={styles.statCol}>
              <StatCard
                label="Total"
                value={metrics.stats.total}
                icon="📋"
                color={colors.primary[500]}
              />
            </View>
            <View style={styles.statCol}>
              <StatCard
                label="Completed"
                value={metrics.stats.completed}
                icon="✓"
                color={colors.success[500]}
              />
            </View>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statCol}>
              <StatCard
                label="In Progress"
                value={metrics.stats.inProgress}
                icon="⏱"
                color={colors.secondary[500]}
              />
            </View>
            <View style={styles.statCol}>
              <StatCard
                label="Overdue"
                value={metrics.stats.overdue}
                icon="⚠"
                color={colors.error[500]}
              />
            </View>
          </View>

          <View style={styles.progressContainer}>
            <Text style={styles.progressLabel}>Completion Rate</Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${metrics.stats.completionRate}%` },
                ]}
              />
            </View>
            <Text style={styles.progressText}>{metrics.stats.completionRate}%</Text>
          </View>

          {metrics.streak > 0 && (
            <View style={styles.streakContainer}>
              <StreakCard streak={metrics.streak} />
            </View>
          )}
        </View>
      ) : null}

      {overdueTasks && overdueTasks.length > 0 && (
        <View style={styles.section}>
          <SectionHeader title="Overdue Tasks" actionLabel="View All" />
          {overdueTasks.slice(0, 2).map(task => (
            <DashboardTaskCard key={task.id} task={task} />
          ))}
        </View>
      )}

      {upcomingTasks && upcomingTasks.length > 0 && (
        <View style={styles.section}>
          <SectionHeader title="Upcoming (Next 7 Days)" actionLabel="View All" />
          {upcomingTasks.slice(0, 3).map(task => (
            <DashboardTaskCard key={task.id} task={task} />
          ))}
        </View>
      )}

      {recentTasks && recentTasks.length > 0 && (
        <View style={styles.section}>
          <SectionHeader title="Recent Activity" actionLabel="View All" />
          {recentTasks.map(task => (
            <DashboardTaskCard key={task.id} task={task} />
          ))}
        </View>
      )}

      {(!recentTasks || recentTasks.length === 0) && !isLoading && (
        <EmptyState
          icon="🎯"
          title="No tasks yet"
          description="Create your first task to get started"
          actionLabel="Add Task"
        />
      )}

      <View style={styles.spacing} />
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
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
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
  section: {
    padding: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  skeletonCard: {
    marginHorizontal: spacing[4],
    marginVertical: spacing[2],
  },
  statsGrid: {
    flexDirection: 'row',
    gap: spacing[3],
    marginBottom: spacing[3],
  },
  statCol: {
    flex: 1,
  },
  progressContainer: {
    marginBottom: spacing[4],
  },
  progressLabel: {
    ...typography.styles.labelSmall,
    color: colors.text.secondary,
    marginBottom: spacing[2],
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.neutral[200],
    borderRadius: spacing[1],
    overflow: 'hidden',
    marginBottom: spacing[2],
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary[500],
    borderRadius: spacing[1],
  },
  progressText: {
    ...typography.styles.caption,
    color: colors.primary[600],
    fontWeight: '600',
  },
  streakContainer: {
    marginTop: spacing[4],
  },
  spacing: {
    height: spacing[8],
  },
});
