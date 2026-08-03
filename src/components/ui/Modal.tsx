import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal as RNModal } from 'react-native';
import { colors, spacing, typography } from '@/theme';

interface ModalProps {
  visible: boolean;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onClose: () => void;
  actions?: Array<{ label: string; onPress: () => void; variant?: 'primary' | 'danger' }>;
  size?: 'sm' | 'md' | 'lg';
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  title,
  subtitle,
  children,
  onClose,
  actions = [],
  size = 'md',
}) => (
  <RNModal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onClose}
  >
    <View style={styles.overlay}>
      <View style={[styles.modal, styles[`modal_${size}`]]}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>{children}</View>

        {actions.length > 0 && (
          <View style={styles.footer}>
            {actions.map((action, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={action.onPress}
                style={[
                  styles.action,
                  action.variant === 'danger'
                    ? styles.actionDanger
                    : styles.actionPrimary,
                ]}
              >
                <Text
                  style={[
                    styles.actionText,
                    action.variant === 'danger'
                      ? { color: colors.error[600] }
                      : { color: colors.primary[600] },
                  ]}
                >
                  {action.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  </RNModal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: colors.bg.primary,
    borderRadius: spacing[3],
    maxWidth: '90%',
  },
  modal_sm: {
    width: 300,
  },
  modal_md: {
    width: 400,
  },
  modal_lg: {
    width: 500,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  title: {
    ...typography.styles.h3,
    color: colors.text.primary,
  },
  subtitle: {
    ...typography.styles.body,
    color: colors.text.secondary,
    marginTop: spacing[1],
  },
  closeButton: {
    padding: spacing[2],
    marginLeft: spacing[2],
  },
  closeIcon: {
    fontSize: 20,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  content: {
    padding: spacing[4],
  },
  footer: {
    flexDirection: 'row',
    gap: spacing[2],
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
  },
  action: {
    flex: 1,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    borderRadius: spacing[2],
  },
  actionPrimary: {
    backgroundColor: colors.primary[50],
  },
  actionDanger: {
    backgroundColor: colors.error[50],
  },
  actionText: {
    ...typography.styles.labelMedium,
    textAlign: 'center',
    fontWeight: '600',
  },
});
