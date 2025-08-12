import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '@/src/providers/ThemeProvider';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  children: React.ReactNode;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  loading = false,
  disabled,
  style,
  ...props
}) => {
  const theme = useTheme();

  const variantStyles = {
    primary: {
      backgroundColor: theme.colors.brand,
      borderColor: theme.colors.brand,
    },
    secondary: {
      backgroundColor: theme.colors.card,
      borderColor: theme.colors.border,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    destructive: {
      backgroundColor: theme.colors.error,
      borderColor: theme.colors.error,
    },
  };

  const textColors = {
    primary: theme.colors.card,
    secondary: theme.colors.textPrimary,
    ghost: theme.colors.brand,
    destructive: theme.colors.card,
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variantStyles[variant],
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={textColors[variant]} />
      ) : (
        <Text style={[styles.text, { color: textColors[variant] }]}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
});