import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { colors, spacing, typography } from '@/theme';

interface TopBarAction {
  icon: string;
  onPress: () => void;
  badge?: number;
}

interface TopBarProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  actions?: TopBarAction[];
  backgroundColor?: string;
  showBorder?: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  title,
  subtitle,
  onBack,
  actions,
  backgroundColor = colors.primary[50],
  showBorder = true,
}) => (
  <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          borderBottomWidth: showBorder ? 1 : 0,
        },
      ]}
    >
      <View style={styles.leftSection}>
        {onBack && (
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
        )}
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>

      {actions && actions.length > 0 && (
        <View style={styles.actionSection}>
          {actions.map((action, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={action.onPress}
              style={styles.actionButton}
            >
              <Text style={styles.actionIcon}>{action.icon}</Text>
              {action.badge !== undefined && action.badge > 0 && (
                <View style={styles.actionBadge}>
                  <Text style={styles.badgeText}>{action.badge}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeArea: {
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    gap: spacing[3],
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  backButton: {
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[2],
  },
  backIcon: {
    fontSize: 20,
    color: colors.text.primary,
    fontWeight: '600',
  },
  title: {
    ...typography.styles.h3,
    color: colors.text.primary,
  },
  subtitle: {
    ...typography.styles.caption,
    color: colors.text.secondary,
    marginTop: spacing[1],
  },
  actionSection: {
    flexDirection: 'row',
    gap: spacing[2],
  },
  actionButton: {
    padding: spacing[2],
    position: 'relative',
  },
  actionIcon: {
    fontSize: 20,
    color: colors.text.primary,
  },
  actionBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: colors.error[500],
    borderRadius: spacing[3],
    minWidth: 20,
    minHeight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    ...typography.styles.caption,
    color: colors.bg.primary,
    fontWeight: '700',
  },
});
