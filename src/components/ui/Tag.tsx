import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius, typography } from '@/theme';

interface TagProps {
  children: string;
  color?: string;
  onRemove?: () => void;
  style?: ViewStyle;
}

export const Tag = React.forwardRef<View, TagProps>(
  ({ children, color = colors.secondary[500], onRemove, style }, ref) => {
    return (
      <View
        ref={ref}
        style={[
          styles.tag,
          { backgroundColor: `${color}20`, borderColor: color },
          style,
        ]}
      >
        <Text style={[styles.text, { color }]}>{children}</Text>
        {onRemove && (
          <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
            <Text style={[styles.removeText, { color }]}>×</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  },
);

Tag.displayName = 'Tag';

const styles = StyleSheet.create({
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.full,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  text: {
    ...typography.styles.bodyXsMedium,
  },
  removeButton: {
    marginLeft: spacing[1],
    paddingHorizontal: spacing[1],
  },
  removeText: {
    fontSize: 18,
    fontWeight: '300',
    lineHeight: 20,
  },
});
