import React from 'react';
import { Redirect } from 'expo-router';

/**
 * Home Screen - Immediately redirects to the games tab
 */
export default function HomeScreen() {
  return <Redirect href="/(tabs)/games" />;
}