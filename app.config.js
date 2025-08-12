module.exports = ({ config }) => {
  return {
    ...config,
    // Important: Keep newArchEnabled: true for React Native Reanimated 4.x compatibility
    newArchEnabled: true,
  };
};