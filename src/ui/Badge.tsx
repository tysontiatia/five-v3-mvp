import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/src/providers/ThemeProvider';

interface BadgeProps {
  type: 'info' | 'success' | 'warning' | 'error';
  label: string;
}

export const Badge: React.FC<BadgeProps> = ({ type, label }) => {
  const theme = useTheme();

  const colors = {
    info: { bg: theme.colors.brandTint, text: theme.colors.brand },
    success: { bg: theme.colors.successTint, text: theme.colors.success },
    warning: { bg: 'rgba(245, 158, 11, 0.12)', text: theme.colors.warning },
    error: { bg: theme.colors.errorTint, text: theme.colors.error },
  };

  return (
    <View style={[styles.badge, { backgroundColor: colors[type].bg }]}>
      <Text style={[styles.text, { color: colors[type].text }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});