import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from './Card';
import { useTheme } from '@/src/providers/ThemeProvider';
import { CheckCircle, XCircle, Clock } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

interface ResultCardProps {
  state: 'correct' | 'incorrect' | 'pending';
  timestamp?: number;
  question: string;
  yourPick?: string;
  correctAnswer?: string;
  coinDelta?: number;
  wager?: number;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  state,
  timestamp,
  question,
  yourPick,
  correctAnswer,
  coinDelta,
  wager,
}) => {
  const theme = useTheme();

  React.useEffect(() => {
    if (state === 'correct' && coinDelta && coinDelta > 0) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else if (state === 'incorrect') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }
  }, [state, coinDelta]);

  const stateConfig = {
    correct: {
      icon: CheckCircle,
      color: theme.colors.success,
      bg: theme.colors.successTint,
      label: 'Correct',
    },
    incorrect: {
      icon: XCircle,
      color: theme.colors.error,
      bg: theme.colors.errorTint,
      label: 'Incorrect',
    },
    pending: {
      icon: Clock,
      color: theme.colors.textMuted,
      bg: theme.colors.bg,
      label: 'Pending',
    },
  };

  const config = stateConfig[state];
  const Icon = config.icon;

  return (
    <Card style={styles.container}>
      <View style={styles.content}>
        <View style={styles.left}>
          <View style={[styles.iconContainer, { backgroundColor: config.bg }]}>
            <Icon size={20} color={config.color} />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.question, theme.typography.body]} numberOfLines={2}>
              {question}
            </Text>
            {yourPick && (
              <Text style={[styles.pick, theme.typography.caption]}>
                Your pick: {yourPick}
              </Text>
            )}
            {correctAnswer && state !== 'pending' && (
              <Text
                style={[
                  styles.answer,
                  {
                    color: state === 'correct' ? theme.colors.success : theme.colors.error,
                  },
                ]}
              >
                {state === 'correct' ? '✓' : `Answer: ${correctAnswer}`}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.right}>
          {coinDelta !== undefined && (
            <Text
              style={[
                styles.coinDelta,
                {
                  color: coinDelta > 0 ? theme.colors.success : theme.colors.error,
                },
              ]}
            >
              {coinDelta > 0 ? '+' : ''}{coinDelta}
            </Text>
          )}
          {wager && (
            <Text style={[styles.wager, theme.typography.caption]}>
              Wager: {wager}
            </Text>
          )}
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
    flexDirection: 'row',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  question: {
    marginBottom: 4,
  },
  pick: {
    marginBottom: 2,
  },
  answer: {
    fontSize: 13,
    fontWeight: '600',
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: 12,
  },
  coinDelta: {
    fontSize: 18,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  wager: {
    marginTop: 2,
  },
});