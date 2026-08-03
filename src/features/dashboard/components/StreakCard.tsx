import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors, spacing, typography } from '@/theme';

interface StreakCardProps {
  streak: number;
}

export const StreakCard: React.FC<StreakCardProps> = ({ streak }) => (
  <View style={styles.container}>
    <View style={styles.streakCircle}>
      <Text style={styles.fireIcon}>🔥</Text>
      <Text style={styles.streakNumber}>{streak}</Text>
    </View>
    <View style={styles.content}>
      <Text style={styles.label}>Day Streak</Text>
      <Text style={styles.description}>Keep it going!</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[4],
    backgroundColor: colors.warning[50],
    borderRadius: spacing[2],
    borderWidth: 1,
    borderColor: colors.warning[200],
    gap: spacing[3],
  },
  streakCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.warning[100],
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  fireIcon: {
    fontSize: 32,
    position: 'absolute',
    top: 5,
    right: 10,
  },
  streakNumber: {
    ...typography.styles.h1,
    color: colors.warning[600],
  },
  content: {
    flex: 1,
  },
  label: {
    ...typography.styles.h3,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  description: {
    ...typography.styles.bodySm,
    color: colors.text.secondary,
  },
});
