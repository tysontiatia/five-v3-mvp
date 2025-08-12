import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/src/providers/ThemeProvider';
import { Card } from '@/src/ui/Card';
import { Badge } from '@/src/ui/Badge';
import { useStore } from '@/src/state/store';
import { Coins, TrendingUp, Award, Target } from 'lucide-react-native';

export default function ProfileScreen() {
  const theme = useTheme();
  const { coins, streak, bestStreak } = useStore();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.bg }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Coin Balance */}
        <Card style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <View style={[styles.coinIcon, { backgroundColor: theme.colors.coin }]}>
              <Coins size={24} color={theme.colors.card} />
            </View>
            <Text style={[styles.balanceLabel, theme.typography.caption]}>
              Total Balance
            </Text>
          </View>
          <Text style={[styles.balanceAmount, theme.typography.h1]}>
            {coins.toLocaleString()}
          </Text>
          <Badge type="success" label="+125 today" />
        </Card>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <TrendingUp size={20} color={theme.colors.brand} />
            <Text style={[styles.statValue, theme.typography.h2]}>{streak}</Text>
            <Text style={[styles.statLabel, theme.typography.caption]}>
              Current Streak
            </Text>
          </Card>
          
          <Card style={styles.statCard}>
            <Award size={20} color={theme.colors.warning} />
            <Text style={[styles.statValue, theme.typography.h2]}>{bestStreak}</Text>
            <Text style={[styles.statLabel, theme.typography.caption]}>
              Best Streak
            </Text>
          </Card>
        </View>

        {/* Account Info */}
        <Card style={styles.infoCard}>
          <Text style={[styles.sectionTitle, theme.typography.h2]}>Account</Text>
          <View style={styles.infoRow}>
            <Text style={theme.typography.body}>Username</Text>
            <Text style={[theme.typography.body, { fontWeight: '600' }]}>
              Player123
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={theme.typography.body}>Member Since</Text>
            <Text style={[theme.typography.body, { fontWeight: '600' }]}>
              Dec 2024
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={theme.typography.body}>Total Games</Text>
            <Text style={[theme.typography.body, { fontWeight: '600' }]}>42</Text>
          </View>
        </Card>

        {/* Achievements */}
        <Card style={styles.achievementsCard}>
          <Text style={[styles.sectionTitle, theme.typography.h2]}>Achievements</Text>
          <View style={styles.achievementRow}>
            <View style={[styles.achievementIcon, { backgroundColor: theme.colors.successTint }]}>
              <Target size={20} color={theme.colors.success} />
            </View>
            <View style={styles.achievementInfo}>
              <Text style={theme.typography.body}>First Win</Text>
              <Text style={theme.typography.caption}>
                Won your first pick
              </Text>
            </View>
          </View>
          <View style={styles.achievementRow}>
            <View style={[styles.achievementIcon, { backgroundColor: theme.colors.brandTint }]}>
              <TrendingUp size={20} color={theme.colors.brand} />
            </View>
            <View style={styles.achievementInfo}>
              <Text style={theme.typography.body}>Hot Streak</Text>
              <Text style={theme.typography.caption}>
                5 correct picks in a row
              </Text>
            </View>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  balanceCard: {
    margin: 16,
    alignItems: 'center',
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  coinIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  balanceLabel: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  balanceAmount: {
    fontSize: 36,
    fontVariant: ['tabular-nums'],
    marginBottom: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    marginTop: 8,
    fontVariant: ['tabular-nums'],
  },
  statLabel: {
    marginTop: 4,
  },
  infoCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  achievementsCard: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
  achievementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  achievementInfo: {
    flex: 1,
  },
});