import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { colors, spacing, typography } from '@/theme';

export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  badge?: number;
  onPress: () => void;
}

interface SidebarSection {
  title?: string;
  items: SidebarItem[];
}

interface SidebarProps {
  sections: SidebarSection[];
  activeItemId?: string;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sections,
  activeItemId,
  onClose,
}) => (
  <SafeAreaView style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>
      {sections.map((section, idx) => (
        <View key={idx} style={idx > 0 && styles.sectionSpacing}>
          {section.title && (
            <Text style={styles.sectionTitle}>{section.title}</Text>
          )}
          {section.items.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.item,
                activeItemId === item.id && styles.itemActive,
              ]}
              onPress={() => {
                item.onPress();
                onClose?.();
              }}
            >
              <Text style={styles.icon}>{item.icon}</Text>
              <Text
                style={[
                  styles.label,
                  activeItemId === item.id && styles.labelActive,
                ]}
              >
                {item.label}
              </Text>
              {item.badge !== undefined && item.badge > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg.primary,
    borderRightWidth: 1,
    borderRightColor: colors.neutral[200],
  },
  sectionSpacing: {
    marginTop: spacing[4],
    paddingTopWidth: 1,
    paddingTopColor: colors.neutral[100],
  },
  sectionTitle: {
    ...typography.styles.caption,
    color: colors.text.tertiary,
    fontWeight: '600',
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    textTransform: 'uppercase',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[3],
    marginHorizontal: spacing[2],
    borderRadius: spacing[2],
    gap: spacing[2],
  },
  itemActive: {
    backgroundColor: colors.primary[50],
  },
  icon: {
    fontSize: 20,
  },
  label: {
    flex: 1,
    ...typography.styles.body,
    color: colors.text.secondary,
  },
  labelActive: {
    color: colors.primary[600],
    fontWeight: '600',
  },
  badge: {
    backgroundColor: colors.error[500],
    borderRadius: spacing[2],
    paddingHorizontal: spacing[1],
    paddingVertical: spacing[0],
    minWidth: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    ...typography.styles.caption,
    color: colors.bg.primary,
    fontWeight: '700',
    textAlign: 'center',
  },
});
