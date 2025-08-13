import React, { createContext, useContext, ReactNode, useState, useEffect, useCallback } from 'react';
import { useColorScheme, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme, Theme, ThemeType } from '@/src/theme/theme';
import createContextHook from '@nkzw/create-context-hook';

// Theme value context
const ThemeContext = createContext<Theme>(lightTheme);

// Theme controller context
interface ThemeControllerContextValue {
  themeType: ThemeType;
  setThemeType: (type: ThemeType) => void;
  isDarkMode: boolean;
}

const ThemeControllerContext = createContext<ThemeControllerContextValue | null>(null);

// Storage key for theme preference
const THEME_PREFERENCE_KEY = '@theme_preference';

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeType, setThemeTypeState] = useState<ThemeType>('system');
  const [isLoading, setIsLoading] = useState(true);

  // Calculate the actual theme based on theme type and system settings
  const activeTheme =
    themeType === 'system'
      ? systemColorScheme === 'dark' ? darkTheme : lightTheme
      : themeType === 'dark' ? darkTheme : lightTheme;

  const isDarkMode =
    themeType === 'system'
      ? systemColorScheme === 'dark'
      : themeType === 'dark';

  // Load saved theme preference
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_PREFERENCE_KEY);
        if (savedTheme) {
          setThemeTypeState(savedTheme as ThemeType);
        }
      } catch (error) {
        console.warn('Failed to load theme preference:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadThemePreference();
  }, []);

  // Set theme preference with AsyncStorage persistence
  const setThemeType = useCallback(async (newThemeType: ThemeType) => {
    setThemeTypeState(newThemeType);
    try {
      await AsyncStorage.setItem(THEME_PREFERENCE_KEY, newThemeType);
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  }, []);

  if (isLoading) {
    return null; // Or a loading indicator if preferred
  }

  return (
    <ThemeControllerContext.Provider value={{ themeType, setThemeType, isDarkMode }}>
      <ThemeContext.Provider value={activeTheme}>
        <StatusBar barStyle={activeTheme.colors.barStyle} animated={true} />
        {children}
      </ThemeContext.Provider>
    </ThemeControllerContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const useThemeController = () => {
  const context = useContext(ThemeControllerContext);
  if (!context) {
    throw new Error('useThemeController must be used within ThemeProvider');
  }
  return context;
};