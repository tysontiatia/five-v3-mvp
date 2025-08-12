import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '@/src/providers/ThemeProvider';
import { SectionHeader } from '@/src/ui/SectionHeader';
import { GameTile } from '@/src/ui/GameTile';
import { CountdownCard } from '@/src/ui/CountdownCard';
import { useStore } from '@/src/state/store';
import { mockGames } from '@/src/mock/data';
import { Zap, Calendar, Trophy } from 'lucide-react-native';

export default function GamesScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { games, setGames, joinGame } = useStore();
  const [refreshing, setRefreshing] = useState(false);
  const [countdown, setCountdown] = useState(25);

  useEffect(() => {
    setGames(mockGames);
  }, [setGames]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 30));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setGames(mockGames);
      setRefreshing(false);
    }, 1000);
  }, [setGames]);

  const handleGamePress = (gameId: string) => {
    joinGame(gameId);
    router.push('/(tabs)/live');
  };

  const liveGames = games.filter((g) => g.status === 'live');
  const upcomingGames = games.filter((g) => g.status === 'upcoming');
  const completedGames = games.filter((g) => g.status === 'final');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.bg }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.countdownContainer}>
          <CountdownCard secondsRemaining={countdown} totalSeconds={30} />
        </View>

        {liveGames.length > 0 && (
          <>
            <SectionHeader
              icon={Zap}
              title="Live Games"
              subtitle={`${liveGames.length} games in progress`}
            />
            {liveGames.map((game) => (
              <GameTile
                key={game.id}
                game={game}
                onPress={() => handleGamePress(game.id)}
              />
            ))}
          </>
        )}

        {upcomingGames.length > 0 && (
          <>
            <SectionHeader
              icon={Calendar}
              title="Upcoming Games"
              subtitle="Today's schedule"
            />
            {upcomingGames.map((game) => (
              <GameTile
                key={game.id}
                game={game}
                onPress={() => handleGamePress(game.id)}
              />
            ))}
          </>
        )}

        {completedGames.length > 0 && (
          <>
            <SectionHeader
              icon={Trophy}
              title="Completed Games"
              subtitle="Final scores"
            />
            {completedGames.map((game) => (
              <GameTile
                key={game.id}
                game={game}
                onPress={() => handleGamePress(game.id)}
              />
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdownContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
});