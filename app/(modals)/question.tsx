import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/src/providers/ThemeProvider';
import { Button } from '@/src/ui/Button';
import { Card } from '@/src/ui/Card';
import { useStore } from '@/src/state/store';
import { X, Timer } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

export default function QuestionModal() {
  const theme = useTheme();
  const router = useRouter();
  const { questionId } = useLocalSearchParams<{ questionId: string }>();
  const { questionsByGame, currentGameId, submitPick } = useStore();
  
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedWager, setSelectedWager] = useState(25);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isLocked, setIsLocked] = useState(false);

  const questions = questionsByGame[currentGameId || ''] || [];
  const question = questions.find((q) => q.id === questionId);

  useEffect(() => {
    if (question?.status === 'locked') {
      setIsLocked(true);
    }
  }, [question]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsLocked(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSelectOption = (optionId: string) => {
    if (!isLocked) {
      setSelectedOption(optionId);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleSelectWager = (amount: number) => {
    if (!isLocked) {
      setSelectedWager(amount);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleSubmit = () => {
    if (selectedOption && !isLocked && question) {
      submitPick(question.id, selectedOption, selectedWager);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.back();
    }
  };

  if (!question) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.bg }]}>
        <View style={styles.emptyState}>
          <Text style={theme.typography.h2}>Question not found</Text>
          <Button variant="primary" onPress={() => router.back()} style={{ marginTop: 16 }}>
            <Text>Go Back</Text>
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  const wagerOptions = [10, 25, 50, 100];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.bg }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <X size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.timerContainer}>
          <Timer size={16} color={isLocked ? theme.colors.error : theme.colors.brand} />
          <Text
            style={[
              styles.timer,
              {
                color: isLocked ? theme.colors.error : theme.colors.brand,
              },
            ]}
          >
            {isLocked ? 'Locked' : `${timeLeft}s`}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, theme.typography.h1]}>{question.prompt}</Text>

        <View style={styles.optionsContainer}>
          {question.options.map((option) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => handleSelectOption(option.id)}
              disabled={isLocked}
              activeOpacity={0.7}
            >
              <Card
                style={[
                  styles.optionCard,
                  selectedOption === option.id && {
                    borderColor: theme.colors.brand,
                    borderWidth: 2,
                    backgroundColor: theme.colors.brandTint,
                  },
                  isLocked && styles.disabled,
                ]}
              >
                <Text
                  style={[
                    styles.optionText,
                    theme.typography.body,
                    selectedOption === option.id && {
                      color: theme.colors.brand,
                      fontWeight: '600',
                    },
                  ]}
                >
                  {option.label}
                </Text>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.wagerSection}>
          <Text style={[styles.wagerTitle, theme.typography.h2]}>Select Wager</Text>
          <View style={styles.wagerOptions}>
            {wagerOptions.map((amount) => (
              <TouchableOpacity
                key={amount}
                onPress={() => handleSelectWager(amount)}
                disabled={isLocked}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.wagerOption,
                    {
                      backgroundColor:
                        selectedWager === amount
                          ? theme.colors.brand
                          : theme.colors.card,
                      borderColor:
                        selectedWager === amount
                          ? theme.colors.brand
                          : theme.colors.border,
                    },
                    isLocked && styles.disabled,
                  ]}
                >
                  <Text
                    style={[
                      styles.wagerText,
                      {
                        color:
                          selectedWager === amount
                            ? theme.colors.card
                            : theme.colors.textPrimary,
                      },
                    ]}
                  >
                    {amount}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {isLocked && (
          <Card style={styles.lockedMessage}>
            <Text style={[theme.typography.caption, { textAlign: 'center' }]}>
              Question is locked. Result will be available soon...
            </Text>
          </Card>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          variant="primary"
          onPress={handleSubmit}
          disabled={!selectedOption || isLocked}
          style={styles.submitButton}
        >
          <Text>Submit Pick</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  closeButton: {
    padding: 8,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
    backgroundColor: 'rgba(37, 99, 255, 0.08)',
  },
  timer: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
  },
  optionsContainer: {
    marginBottom: 32,
  },
  optionCard: {
    marginBottom: 12,
    minHeight: 80,
    justifyContent: 'center',
  },
  optionText: {
    textAlign: 'center',
  },
  wagerSection: {
    marginBottom: 24,
  },
  wagerTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  wagerOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wagerOption: {
    width: 75,
    height: 48,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wagerText: {
    fontSize: 16,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
  lockedMessage: {
    marginBottom: 24,
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  submitButton: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
});