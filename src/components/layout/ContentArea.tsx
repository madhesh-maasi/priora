import React from 'react';
import { StyleSheet, View, ScrollView, ViewStyle, ScrollViewProps } from 'react-native';
import { colors, spacing } from '@/theme';

interface ContentAreaProps extends ScrollViewProps {
  children: React.ReactNode;
  scrollable?: boolean;
  padding?: number;
  backgroundColor?: string;
  style?: ViewStyle;
}

export const ContentArea: React.FC<ContentAreaProps> = ({
  children,
  scrollable = true,
  padding = spacing[4],
  backgroundColor = colors.bg.primary,
  style,
  ...scrollViewProps
}) => {
  const containerStyle = [
    styles.container,
    { paddingHorizontal: padding, paddingVertical: padding, backgroundColor },
    style,
  ];

  if (scrollable) {
    return (
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={containerStyle}
        showsVerticalScrollIndicator={false}
        {...scrollViewProps}
      >
        {children}
      </ScrollView>
    );
  }

  return <View style={containerStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
  },
});
