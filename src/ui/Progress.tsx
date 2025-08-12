import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/src/providers/ThemeProvider';

interface ProgressProps {
  value: number; // 0-100
}

export const Progress: React.FC<ProgressProps> = ({ value }) => {
  const theme = useTheme();
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.border }]}>
      <View
        style={[
          styles.fill,
          {
            backgroundColor: theme.colors.brand,
            width: `${clampedValue}%`,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
  },
});