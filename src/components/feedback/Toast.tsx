import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import { colors, spacing, borderRadius, shadows, typography } from '@/theme';

export type ToastType = 'success' | 'error' | 'info' | 'warning';
export type ToastPosition = 'top' | 'bottom';

interface ToastProps {
  type?: ToastType;
  message: string;
  duration?: number;
  position?: ToastPosition;
  onClose?: () => void;
}

const typeConfig: Record<ToastType, { bg: string; icon: string; color: string }> = {
  success: { bg: colors.success[600], icon: '✓', color: colors.text.inverse },
  error: { bg: colors.error[600], icon: '✕', color: colors.text.inverse },
  info: { bg: colors.secondary[600], icon: 'ℹ', color: colors.text.inverse },
  warning: { bg: colors.warning[600], icon: '!', color: colors.text.inverse },
};

export const Toast: React.FC<ToastProps> = ({
  type = 'info',
  message,
  duration = 3000,
  position = 'bottom',
  onClose,
}) => {
  const [visible, setVisible] = useState(true);
  const opacity = new Animated.Value(1);

  const config = typeConfig[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false);
        onClose?.();
      });
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        position === 'top' ? styles.top : styles.bottom,
        { opacity },
      ]}
    >
      <View style={[styles.toast, { backgroundColor: config.bg }]}>
        <Text style={[styles.icon, { color: config.color }]}>{config.icon}</Text>
        <Text style={[styles.message, { color: config.color }]}>{message}</Text>
        <TouchableOpacity
          onPress={() => {
            setVisible(false);
            onClose?.();
          }}
          style={styles.closeButton}
        >
          <Text style={[styles.closeIcon, { color: config.color }]}>×</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: spacing[4],
    right: spacing[4],
    zIndex: 999,
  },
  top: {
    top: spacing[4],
  },
  bottom: {
    bottom: spacing[4],
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderRadius: borderRadius.lg,
    ...shadows.lg,
  },
  icon: {
    fontSize: 20,
    fontWeight: '600',
    marginRight: spacing[2],
  },
  message: {
    flex: 1,
    ...typography.styles.bodySm,
  },
  closeButton: {
    marginLeft: spacing[2],
    padding: spacing[1],
  },
  closeIcon: {
    fontSize: 24,
    fontWeight: '300',
    lineHeight: 24,
  },
});
