import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const SplashScreen = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#007AFF" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default SplashScreen;