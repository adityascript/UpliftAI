import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AnimatedWaveform = () => {
  const screenWidth = Dimensions.get('window').width;
  const waveformWidth = screenWidth - 80; // Account for padding
  
  // Create animated values for more bars (wider waveform)
  const animatedValues = useRef(
    Array.from({ length: 18 }, () => new Animated.Value(0))
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
      outputRange: [4, 20], // Larger bars: Min height 4px, max height 20px
    });

    const opacity = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.7, 1], // Higher opacity for better contrast
    });

    // Create different gradient patterns for visual variety
    const getGradientColors = (index) => {
      const patterns = [
        ['#14B8A6', '#06B6D4'], // Teal to cyan gradient
        ['#0D9488', '#0891B2'], // Darker teal to darker cyan
        ['#14B8A6', '#0EA5E9'], // Teal to sky blue
        ['#06B6D4', '#14B8A6'], // Cyan to teal (reversed)
      ];
      return patterns[index % patterns.length];
    };

    return (
      <Animated.View
        key={index}
        style={[
          styles.waveformBar,
          {
            height,
            opacity,
          },
        ]}
      >
        <LinearGradient
          colors={getGradientColors(index)}
          style={styles.gradientBar}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
      </Animated.View>
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
    paddingVertical: 12, // More padding for larger animation
    overflow: 'hidden',
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 24, // Taller container for bigger bars
    width: '90%', // Make it wider (90% of parent width)
  },
  waveformBar: {
    width: 4, // Wider bars for better visibility
    borderRadius: 2,
    marginHorizontal: 1.5, // Slightly less margin to fit more bars
    minHeight: 4,
    overflow: 'hidden', // For gradient
    shadowColor: '#000', // Add subtle shadow for depth
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  gradientBar: {
    flex: 1,
    borderRadius: 2,
  },
});

export default AnimatedWaveform;
