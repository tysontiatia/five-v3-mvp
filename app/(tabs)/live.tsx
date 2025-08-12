import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '@/src/providers/ThemeProvider';
import { Card } from '@/src/ui/Card';
import { Badge } from '@/src/ui/Badge';
import { TeamLogo } from '@/src/ui/TeamLogo';
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
        <Card style={styles.headerCard}>
          <View style={styles.statusRow}>
            <Badge type="error" label="LIVE" />
            <Text style={[styles.statusText, theme.typography.caption]}>
              {currentGame.meta}
            </Text>
          </View>
          
          <View style={styles.teams}>
            <View style={styles.team}>
              <TeamLogo team={currentGame.home} size={64} />
              <Text style={[styles.teamName, theme.typography.body]}>
                {currentGame.home.name}
              </Text>
              {currentGame.homeScore !== undefined && (
                <Text style={[styles.score, theme.typography.h1]}>
                  {currentGame.homeScore}
                </Text>
              )}
            </View>
            
            <Text style={[styles.vs, theme.typography.caption]}>vs</Text>
            
            <View style={styles.team}>
              <TeamLogo team={currentGame.away} size={64} />
              <Text style={[styles.teamName, theme.typography.body]}>
                {currentGame.away.name}
              </Text>
              {currentGame.awayScore !== undefined && (
                <Text style={[styles.score, theme.typography.h1]}>
                  {currentGame.awayScore}
                </Text>
              )}
            </View>
          </View>
        </Card>

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
                <Card>
                  <Text style={[theme.typography.body, { textAlign: 'center' }]}>
                    No picks yet. Answer questions to start playing!
                  </Text>
                </Card>
              )}
            </>
          )}
          
          {activeTab === 'stats' && (
            <Card>
              <Text style={theme.typography.body}>Game statistics coming soon</Text>
            </Card>
          )}
          
          {activeTab === 'ranks' && (
            <Card>
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
  headerCard: {
    margin: 16,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusText: {
    marginLeft: 8,
  },
  teams: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  team: {
    alignItems: 'center',
    flex: 1,
  },
  teamName: {
    marginTop: 8,
    textAlign: 'center',
  },
  score: {
    marginTop: 4,
    fontVariant: ['tabular-nums'],
  },
  vs: {
    marginHorizontal: 16,
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
});