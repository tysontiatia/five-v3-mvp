import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/src/providers/ThemeProvider';
import { LucideIcon } from 'lucide-react-native';

interface SectionHeaderProps {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  variant?: 'plain';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon: Icon,
  title,
  subtitle,
  variant = 'plain',
}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {Icon && <Icon size={20} color={theme.colors.textMuted} />}
      <View style={styles.textContainer}>
        <Text style={[styles.title, theme.typography.h2]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.subtitle, theme.typography.caption]}>{subtitle}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  textContainer: {
    marginLeft: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  subtitle: {
    marginTop: 2,
  },
});