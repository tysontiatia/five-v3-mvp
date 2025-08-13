import { TextStyle, ViewStyle } from 'react-native';

// Base theme with shared values
const baseTheme = {
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

// Light theme colors
export const lightTheme = {
    ...baseTheme,
    colors: {
        brand: '#2563FF',
        brandNavy: '#0F172A',
        bg: '#F7F8FC',
        card: '#FFFFFF',
        border: '#E5E7EB',
        textPrimary: '#0F172A',
        textSecondary: '#1E293B',
        textMuted: '#475569',
        textInverted: '#FFFFFF',
        success: '#16A34A',
        warning: '#F59E0B',
        error: '#EF4444',
        coin: '#F2C94C',
        brandTint: 'rgba(37, 99, 255, 0.12)',
        successTint: 'rgba(22, 163, 74, 0.12)',
        warningTint: 'rgba(245, 158, 11, 0.12)',
        errorTint: 'rgba(239, 68, 68, 0.12)',
        barStyle: 'dark-content' as const,
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
};

// Dark theme colors
export const darkTheme = {
    ...baseTheme,
    colors: {
        brand: '#3B82F6',
        brandNavy: '#F8FAFC',
        bg: '#0F172A',
        card: '#1E293B',
        border: '#334155',
        textPrimary: '#F8FAFC',
        textSecondary: '#E2E8F0',
        textMuted: '#94A3B8',
        textInverted: '#0F172A',
        success: '#22C55E',
        warning: '#FBBF24',
        error: '#EF4444',
        coin: '#F2C94C',
        brandTint: 'rgba(59, 130, 246, 0.16)',
        successTint: 'rgba(34, 197, 94, 0.16)',
        warningTint: 'rgba(251, 191, 36, 0.16)',
        errorTint: 'rgba(239, 68, 68, 0.16)',
        barStyle: 'light-content' as const,
    },
    typography: {
        h1: {
            fontSize: 24,
            fontWeight: '700' as TextStyle['fontWeight'],
            color: '#F8FAFC',
        },
        h2: {
            fontSize: 20,
            fontWeight: '700' as TextStyle['fontWeight'],
            color: '#F8FAFC',
        },
        body: {
            fontSize: 16,
            fontWeight: '500' as TextStyle['fontWeight'],
            color: '#F8FAFC',
        },
        caption: {
            fontSize: 13,
            fontWeight: '500' as TextStyle['fontWeight'],
            color: '#94A3B8',
        },
    },
};

export type Theme = typeof lightTheme;
export type ThemeType = 'light' | 'dark' | 'system';
