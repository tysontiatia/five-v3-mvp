import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '@/src/providers/ThemeProvider';
import { Card } from '@/src/ui/Card';
import { LiveGameHeaderCard } from '@/src/ui/LiveGameHeaderCard';
import { CountdownCard } from '@/src/ui/CountdownCard';
import { SegmentedTabs } from '@/src/ui/SegmentedTabs';
import { ResultCard } from '@/src/ui/ResultCard';
import { Button } from '@/src/ui/Button';
import { useStore } from '@/src/state/store';
import { useMockRunner } from '@/src/mock/mockRunner';
import { mockQuestions } from '@/src/mock/data';

export default function LiveScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { currentGameId, games, questionsByGame, picksByGame, setQuestions } = useStore();
  const [activeTab, setActiveTab] = useState('picks');
  const [countdown, setCountdown] = useState(20);

  useMockRunner();

  const currentGame = games.find((g) => g.id === currentGameId);
  const questions = questionsByGame[currentGameId || ''] || [];
  const picks = picksByGame[currentGameId || ''] || [];

  useEffect(() => {
    if (currentGameId && questions.length === 0) {
      setQuestions(currentGameId, mockQuestions.filter((q) => q.gameId === currentGameId));
    }
  }, [currentGameId, questions.length, setQuestions]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 30));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const openQuestion = questions.find((q) => q.status === 'open');

  const handleAnswerQuestion = () => {
    if (openQuestion) {
      router.push({
        pathname: '/(modals)/question',
        params: { questionId: openQuestion.id },
      });
    }
  };

  if (!currentGame) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.bg }]}>
        <View style={styles.emptyState}>
          <Text style={theme.typography.h2}>No game selected</Text>
          <Button
            variant="primary"
            onPress={() => router.push('/(tabs)/games')}
            style={{ marginTop: 16 }}
          >
            <Text>Browse Games</Text>
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  const tabs = [
    { key: 'picks', label: 'Picks' },
    { key: 'stats', label: 'Stats' },
    { key: 'ranks', label: 'Ranks' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.bg }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Live Game Header */}
        <LiveGameHeaderCard game={currentGame} />

        {/* Countdown */}
        <View style={styles.countdownContainer}>
          <CountdownCard secondsRemaining={countdown} totalSeconds={30} />
        </View>

        {/* Answer Button */}
        {openQuestion && (
          <View style={styles.answerContainer}>
            <Button variant="primary" onPress={handleAnswerQuestion}>
              <Text>Answer Live Question</Text>
            </Button>
          </View>
        )}

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <SegmentedTabs tabs={tabs} activeKey={activeTab} onTabPress={setActiveTab} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          {activeTab === 'picks' && (
            <>
              {questions.map((question) => {
                const pick = picks.find((p) => p.questionId === question.id);
                if (!pick && question.status !== 'resolved') return null;
                
                return (
                  <ResultCard
                    key={question.id}
                    state={
                      question.status === 'resolved'
                        ? pick?.outcome === 'win'
                          ? 'correct'
                          : 'incorrect'
                        : 'pending'
                    }
                    question={question.prompt}
                    yourPick={
                      pick
                        ? question.options.find((o) => o.id === pick.optionId)?.label
                        : undefined
                    }
                    correctAnswer={
                      question.correctOptionId
                        ? question.options.find((o) => o.id === question.correctOptionId)
                            ?.label
                        : undefined
                    }
                    coinDelta={pick?.coinDelta}
                    wager={pick?.wager}
                    timestamp={pick?.timestamp}
                  />
                );
              })}
              {picks.length === 0 && (
                <Card style={styles.emptyCard}>
                  <Text style={[theme.typography.body, { textAlign: 'center' }]}>
                    No picks yet. Answer questions to start playing!
                  </Text>
                </Card>
              )}
            </>
          )}
          
          {activeTab === 'stats' && (
            <Card style={styles.emptyCard}>
              <Text style={theme.typography.body}>Game statistics coming soon</Text>
            </Card>
          )}
          
          {activeTab === 'ranks' && (
            <Card style={styles.emptyCard}>
              <Text style={theme.typography.body}>Leaderboard coming soon</Text>
            </Card>
          )}
        </View>
      </ScrollView>
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
  countdownContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  answerContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tabsContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  emptyCard: {
    marginBottom: 12,
  },
});