import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';

const AnimatedWaveform = () => {
  const screenWidth = Dimensions.get('window').width;
  const waveformWidth = screenWidth - 80; // Account for padding
  
  // Create animated values for each bar
  const animatedValues = useRef(
    Array.from({ length: 12 }, () => new Animated.Value(0))
  ).current;
  
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Create staggered height animations for bars
    const createBarAnimation = (animatedValue, delay) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 800 + Math.random() * 400, // Vary duration for natural feel
            useNativeDriver: false,
            delay,
          }),
          Animated.timing(animatedValue, {
            toValue: 0.3,
            duration: 600 + Math.random() * 300,
            useNativeDriver: false,
          }),
        ])
      );
    };

    // Start all bar animations with different delays
    const barAnimations = animatedValues.map((animatedValue, index) =>
      createBarAnimation(animatedValue, index * 100)
    );

    // Create horizontal movement animation
    const horizontalAnimation = Animated.loop(
      Animated.timing(translateX, {
        toValue: 20, // Move 20 pixels right and back
        duration: 3000,
        useNativeDriver: true,
      })
    );

    // Start all animations
    Animated.parallel([...barAnimations, horizontalAnimation]).start();

    // Cleanup
    return () => {
      animatedValues.forEach(value => value.stopAnimation());
      translateX.stopAnimation();
    };
  }, []);

  const renderWaveformBar = (animatedValue, index) => {
    const height = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [2, 12], // Min height 2px, max height 12px
    });

    const opacity = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.4, 0.8],
    });

    return (
      <Animated.View
        key={index}
        style={[
          styles.waveformBar,
          {
            height,
            opacity,
            backgroundColor: index % 3 === 0 ? '#2D5016' : '#B8E6B8', // Alternate between dark and light green
          },
        ]}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.waveformContainer,
          {
            transform: [
              {
                translateX: translateX.interpolate({
                  inputRange: [0, 20],
                  outputRange: [0, 10],
                }),
              },
            ],
          },
        ]}
      >
        {animatedValues.map((animatedValue, index) =>
          renderWaveformBar(animatedValue, index)
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 8,
    overflow: 'hidden',
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 16,
  },
  waveformBar: {
    width: 3,
    borderRadius: 1.5,
    marginHorizontal: 2,
    minHeight: 2,
  },
});

export default AnimatedWaveform;
