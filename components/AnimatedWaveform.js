import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AnimatedWaveform = () => {
  const screenWidth = Dimensions.get('window').width;
  const waveformWidth = screenWidth - 80; // Account for padding
  
  // Create animated values for 14 bars with varied heights
  const numberOfBars = 14;
  const animatedValues = useRef(
    Array.from({ length: numberOfBars }, () => new Animated.Value(0))
  ).current;
  
  // Generate varied base heights for each bar (4px to 24px range)
  const baseHeights = useRef(
    Array.from({ length: numberOfBars }, (_, index) => {
      // Create a more realistic waveform pattern with varied heights
      const patterns = [
        0.2, 0.7, 0.4, 0.9, 0.3, 0.8, 0.5, 
        0.6, 0.9, 0.3, 0.7, 0.4, 0.8, 0.2
      ];
      // Ensure no two adjacent bars are the same height
      let height = patterns[index % patterns.length];
      
      // Add slight randomization to avoid exact repetition
      height += (Math.random() - 0.5) * 0.1;
      
      // Clamp between 0.2 and 1.0
      return Math.max(0.2, Math.min(1.0, height));
    })
  ).current;
  
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Create staggered height animations for bars with slower, smoother timing
    const createBarAnimation = (animatedValue, delay) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 2000 + Math.random() * 1000, // Much slower: 2-3 seconds
            useNativeDriver: false,
            delay,
            easing: Easing.bezier(0.4, 0.0, 0.6, 1.0), // Smooth ease-in-out
          }),
          Animated.timing(animatedValue, {
            toValue: 0.2,
            duration: 1800 + Math.random() * 800, // Slower return: 1.8-2.6 seconds
            useNativeDriver: false,
            easing: Easing.bezier(0.4, 0.0, 0.6, 1.0), // Smooth ease-in-out
          }),
        ])
      );
    };

    // Start all bar animations with different delays for organic feel
    const barAnimations = animatedValues.map((animatedValue, index) =>
      createBarAnimation(animatedValue, index * 150) // Longer stagger for more fluid wave
    );

    // Create slower horizontal movement animation
    const horizontalAnimation = Animated.loop(
      Animated.timing(translateX, {
        toValue: 20, // Same distance but slower
        duration: 5000, // Much slower: 5 seconds
        useNativeDriver: true,
        easing: Easing.bezier(0.4, 0.0, 0.6, 1.0), // Smooth movement
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
    const baseHeight = baseHeights[index];
    
    // Calculate actual height using base height pattern (4px to 24px range)
    const minHeight = 4;
    const maxHeight = 24;
    const staticHeight = minHeight + (baseHeight * (maxHeight - minHeight));
    
    // Animated height with subtle variation around the base height
    const height = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [staticHeight * 0.8, staticHeight * 1.1], // Animate around base height
    });

    // Opacity animation for breathing effect
    const opacity = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.6, 0.95], // Subtle opacity change
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
    alignItems: 'flex-end', // Align bars to bottom for waveform look
    justifyContent: 'center',
    height: 28, // Container height to accommodate tallest bars
    width: '90%', // Make it wider (90% of parent width)
  },
  waveformBar: {
    width: 5, // Slightly wider bars for better visibility of height variation
    borderRadius: 2.5, // Rounded corners matching width
    marginHorizontal: 1.5, // Consistent spacing
    overflow: 'hidden', // For gradient
    shadowColor: '#000', // Add subtle shadow for depth
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15, // Slightly reduced shadow for calmer feel
    shadowRadius: 1,
    elevation: 2,
  },
  gradientBar: {
    flex: 1,
    borderRadius: 2,
  },
});

export default AnimatedWaveform;
