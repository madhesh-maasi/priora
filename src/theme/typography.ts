import { StyleSheet } from 'react-native';

export const typography = {
  // Font families
  family: {
    default: 'System',
    mono: 'Menlo',
  },

  // Font sizes
  size: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Font weights
  weight: {
    light: '300' as const,
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  // Predefined styles
  styles: StyleSheet.create({
    // Display
    display1: {
      fontSize: 36,
      fontWeight: '700',
      lineHeight: 44,
      letterSpacing: -0.5,
    },
    display2: {
      fontSize: 30,
      fontWeight: '700',
      lineHeight: 36,
      letterSpacing: -0.3,
    },

    // Headings
    h1: {
      fontSize: 28,
      fontWeight: '700',
      lineHeight: 34,
    },
    h2: {
      fontSize: 24,
      fontWeight: '700',
      lineHeight: 30,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 26,
    },
    h4: {
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 24,
    },
    h5: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 22,
    },
    h6: {
      fontSize: 14,
      fontWeight: '600',
      lineHeight: 20,
    },

    // Body text
    body: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
    },
    bodyMedium: {
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 24,
    },
    bodySm: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
    },
    bodySmMedium: {
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 20,
    },
    bodyXs: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
    },
    bodyXsMedium: {
      fontSize: 12,
      fontWeight: '500',
      lineHeight: 16,
    },

    // Labels
    label: {
      fontSize: 14,
      fontWeight: '600',
      lineHeight: 20,
      textTransform: 'uppercase' as const,
      letterSpacing: 0.5,
    },
    labelSm: {
      fontSize: 12,
      fontWeight: '600',
      lineHeight: 16,
      textTransform: 'uppercase' as const,
      letterSpacing: 0.3,
    },

    // Code
    code: {
      fontSize: 14,
      fontFamily: 'Menlo',
      fontWeight: '400',
      lineHeight: 20,
    },
    codeSm: {
      fontSize: 12,
      fontFamily: 'Menlo',
      fontWeight: '400',
      lineHeight: 16,
    },

    // Button text
    button: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 20,
    },
    buttonSm: {
      fontSize: 14,
      fontWeight: '600',
      lineHeight: 18,
    },
  }),
};

export type Typography = typeof typography;
