import { TextStyle, ViewStyle } from 'react-native';

export const theme = {
  colors: {
    brand: '#2563FF',
    brandNavy: '#0F172A',
    bg: '#F7F8FC',
    card: '#FFFFFF',
    border: '#E5E7EB',
    textPrimary: '#0F172A',
    textMuted: '#475569',
    success: '#16A34A',
    warning: '#F59E0B',
    error: '#EF4444',
    coin: '#F2C94C',
    brandTint: 'rgba(37, 99, 255, 0.12)',
    successTint: 'rgba(22, 163, 74, 0.12)',
    errorTint: 'rgba(239, 68, 68, 0.12)',
  },
  radii: {
    xs: 6,
    sm: 10,
    md: 14,
    lg: 18,
    xl: 24,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  typography: {
    h1: {
      fontSize: 24,
      fontWeight: '700' as TextStyle['fontWeight'],
      color: '#0F172A',
    },
    h2: {
      fontSize: 20,
      fontWeight: '700' as TextStyle['fontWeight'],
      color: '#0F172A',
    },
    body: {
      fontSize: 16,
      fontWeight: '500' as TextStyle['fontWeight'],
      color: '#0F172A',
    },
    caption: {
      fontSize: 13,
      fontWeight: '500' as TextStyle['fontWeight'],
      color: '#475569',
    },
  },
  shadow: {
    card: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 3,
    } as ViewStyle,
  },
};

export type Theme = typeof theme;