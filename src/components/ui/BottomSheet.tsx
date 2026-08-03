import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { colors, spacing, typography } from '@/theme';

interface BottomSheetProps {
  visible: boolean;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onClose: () => void;
  height?: number | string;
  scrollable?: boolean;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  title,
  subtitle,
  children,
  onClose,
  height = '60%',
  scrollable = true,
}) => (
  <Modal
    visible={visible}
    transparent
    animationType="slide"
    onRequestClose={onClose}
  >
    <View style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={[styles.sheet, { height }]}>
        <View style={styles.handle}>
          <View style={styles.handleBar} />
        </View>

        <View style={styles.header}>
          <View>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        </View>

        {scrollable ? (
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
        ) : (
          <View style={styles.content}>{children}</View>
        )}
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  sheet: {
    backgroundColor: colors.bg.primary,
    borderTopLeftRadius: spacing[4],
    borderTopRightRadius: spacing[4],
    paddingHorizontal: spacing[4],
  },
  handle: {
    alignItems: 'center',
    paddingVertical: spacing[2],
  },
  handleBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.neutral[300],
  },
  header: {
    paddingVertical: spacing[3],
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
  content: {
    flex: 1,
    paddingVertical: spacing[3],
  },
});
