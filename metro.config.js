const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add Reanimated plugin settings
// Learn more: https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/
config.resolver.sourceExts = [...config.resolver.sourceExts, 'mjs'];

// If you're using NativeWind, uncomment the following:
/*
const { withNativeWind } = require('nativewind/metro');
const nativeWindConfig = withNativeWind(config, {
  input: './global.css',
  configPath: './tailwind.config.js'
});
return nativeWindConfig;
*/

module.exports = config;
