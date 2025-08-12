import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from './Card';
import { Progress } from './Progress';
import { useTheme } from '@/src/providers/ThemeProvider';
import { Clock } from 'lucide-react-native';

interface CountdownCardProps {
  secondsRemaining: number;
  totalSeconds?: number;
}

export const CountdownCard: React.FC<CountdownCardProps> = ({
  secondsRemaining,
  totalSeconds = 30,
}) => {
  const theme = useTheme();
  const [seconds, setSeconds] = useState(secondsRemaining);

  useEffect(() => {
    setSeconds(secondsRemaining);
  }, [secondsRemaining]);

  const progress = ((totalSeconds - seconds) / totalSeconds) * 100;
  const state = seconds > 10 ? 'waiting' : seconds > 0 ? 'soon' : 'open';

  const stateColors = {
    waiting: theme.colors.textMuted,
    soon: theme.colors.warning,
    open: theme.colors.success,
  };

  const stateLabels = {
    waiting: 'Next question in',
    soon: 'Get ready',
    open: 'Question is live!',
  };

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Clock size={16} color={stateColors[state]} />
        <Text style={[styles.label, { color: stateColors[state] }]}>
          {stateLabels[state]}
        </Text>
      </View>
      <Text style={[styles.timer, theme.typography.h1]}>
        {seconds > 0 ? `${seconds}s` : 'NOW'}
      </Text>
      <Progress value={progress} />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  timer: {
    marginBottom: 12,
    fontVariant: ['tabular-nums'],
  },
});