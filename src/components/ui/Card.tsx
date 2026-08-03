import React from 'react';
import { StyleSheet, View, ViewStyle, Text, TextStyle } from 'react-native';
import { colors, spacing, borderRadius, shadows } from '@/theme';

export type CardVariant = 'default' | 'outlined' | 'elevated';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  padding?: number;
  style?: ViewStyle;
}

interface CardHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface CardBodyProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface CardFooterProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface CardTitleProps {
  children: string;
  style?: TextStyle;
}

interface CardDescriptionProps {
  children: string;
  style?: TextStyle;
}

export const Card = React.forwardRef<View, CardProps>(
  ({ children, variant = 'default', padding = spacing[4], style }, ref) => {
    return (
      <View
        ref={ref}
        style={[
          styles.card,
          styles[`${variant}Card`],
          { padding },
          style,
        ]}
      >
        {children}
      </View>
    );
  },
);

Card.displayName = 'Card';

export const CardHeader: React.FC<CardHeaderProps> = ({ children, style }) => (
  <View style={[styles.header, style]}>{children}</View>
);

export const CardBody: React.FC<CardBodyProps> = ({ children, style }) => (
  <View style={[styles.body, style]}>{children}</View>
);

export const CardFooter: React.FC<CardFooterProps> = ({ children, style }) => (
  <View style={[styles.footer, style]}>{children}</View>
);

export const CardTitle: React.FC<CardTitleProps> = ({ children, style }) => (
  <Text style={[styles.title, style]}>{children}</Text>
);

export const CardDescription: React.FC<CardDescriptionProps> = ({ children, style }) => (
  <Text style={[styles.description, style]}>{children}</Text>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    backgroundColor: colors.bg.primary,
  },
  defaultCard: {
    ...shadows.base,
  },
  outlinedCard: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  elevatedCard: {
    ...shadows.lg,
  },
  header: {
    marginBottom: spacing[4],
  },
  body: {
    marginBottom: spacing[4],
  },
  footer: {
    marginTop: spacing[4],
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.text.secondary,
  },
});
