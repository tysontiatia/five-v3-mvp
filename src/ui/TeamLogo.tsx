import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '@/src/providers/ThemeProvider';
import { Team } from '@/src/types';

interface TeamLogoProps {
  team: Team;
  size?: number;
  ring?: boolean;
}

export const TeamLogo: React.FC<TeamLogoProps> = ({ team, size = 48, ring = true }) => {
  const theme = useTheme();
  const monogram = team.code || team.name.slice(0, 3).toUpperCase();

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: ring ? 2 : 0,
          borderColor: theme.colors.border,
        },
      ]}
    >
      {team.logoUri ? (
        <Image
          source={{ uri: team.logoUri }}
          style={{ width: size - 8, height: size - 8, borderRadius: (size - 8) / 2 }}
          resizeMode="contain"
        />
      ) : (
        <View
          style={[
            styles.monogram,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: theme.colors.brandTint,
            },
          ]}
        >
          <Text
            style={[
              styles.monogramText,
              {
                fontSize: size * 0.35,
                color: theme.colors.brand,
              },
            ]}
          >
            {monogram}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  monogram: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  monogramText: {
    fontWeight: '700',
  },
});