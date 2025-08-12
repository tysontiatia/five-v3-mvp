import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from './Card';
import { Badge } from './Badge';
import { TeamLogo } from './TeamLogo';
import { useTheme } from '@/src/providers/ThemeProvider';
import { Game } from '@/src/types';

interface LiveGameHeaderCardProps {
  game: Game;
}

export const LiveGameHeaderCard: React.FC<LiveGameHeaderCardProps> = ({ game }) => {
  const theme = useTheme();

  return (
    <Card style={styles.container}>
      <View style={styles.statusRow}>
        <Badge type="error" label="LIVE" />
        <Text
          style={[
            styles.statusText,
            theme.typography.caption,
            { color: theme.colors.error },
          ]}
        >
          {game.meta}
        </Text>
      </View>
      
      <View style={styles.teams}>
        <View style={styles.team}>
          <TeamLogo team={game.home} size={56} />
          <Text style={[styles.teamName, theme.typography.body]} numberOfLines={1}>
            {game.home.name}
          </Text>
          {game.homeScore !== undefined && (
            <Text style={[styles.score, theme.typography.h1]}>
              {game.homeScore}
            </Text>
          )}
        </View>
        
        <Text style={[styles.vs, theme.typography.caption]}>vs</Text>
        
        <View style={styles.team}>
          <TeamLogo team={game.away} size={56} />
          <Text style={[styles.teamName, theme.typography.body]} numberOfLines={1}>
            {game.away.name}
          </Text>
          {game.awayScore !== undefined && (
            <Text style={[styles.score, theme.typography.h1]}>
              {game.awayScore}
            </Text>
          )}
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statusText: {
    flex: 1,
    textAlign: 'right',
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
});