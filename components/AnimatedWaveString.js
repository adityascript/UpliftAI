import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';



const AnimatedWaveString = () => {
  const screenWidth = Dimensions.get('window').width;
  const stringWidth = screenWidth * 0.9; // 90% of screen width for better span
  const numSegments = 80; // Even more segments for highly detailed wave
  
  const animationValue = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    const waveAnimation = Animated.loop(
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 3000, // Faster to show more vibration activity
        useNativeDriver: true,
        easing: Easing.linear,
      })
    );
    
    waveAnimation.start();
    
    return () => {
      animationValue.stopAnimation();
    };
  }, []);
  
  const renderWaveSegments = () => {
    const segments = [];
    
    for (let i = 0; i < numSegments; i++) {
      const segmentWidth = stringWidth / numSegments;
      const x = i * segmentWidth;
      
      // Calculate distance from center for amplitude tapering
      const centerRatio = i / (numSegments - 1); // 0 to 1
      const distanceFromCenter = Math.abs(centerRatio - 0.5) * 2; // 0 at center, 1 at edges
      
      // Enhanced amplitude with more pronounced center activity
      const maxAmplitude = 12; // Increased max amplitude
      const minAmplitude = 0.2;
      const amplitudeCurve = Math.cos(distanceFromCenter * Math.PI / 2); // Cosine for smooth falloff
      const amplitude = minAmplitude + (maxAmplitude - minAmplitude) * amplitudeCurve;
      
      // Multiple wave frequencies for rich sinusoidal pattern
      const primaryPhase = i * 0.4; // Higher frequency for more crests/troughs
      const secondaryPhase = i * 0.25; // Secondary wave
      const tertiaryPhase = i * 0.6; // Even higher frequency for fine detail
      const microPhase = i * 0.8; // Very fine oscillations
      
      const animatedTransform = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 2 * Math.PI],
        extrapolate: 'clamp',
      });
      
      segments.push(
        <Animated.View
          key={i}
          style={[
            styles.waveSegment,
            {
              left: x,
              width: segmentWidth + 0.5, // Slight overlap for seamless appearance
              transform: [
                {
                  translateY: animatedTransform.interpolate({
                    inputRange: [0, 2 * Math.PI],
                    outputRange: [
                      // Complex sinusoidal combination for rich wave pattern
                      (Math.sin(primaryPhase) * 0.4 + 
                       Math.sin(secondaryPhase) * 0.3 + 
                       Math.sin(tertiaryPhase) * 0.2 + 
                       Math.sin(microPhase) * 0.1) * amplitude,
                      // Same pattern shifted by 2π for continuous motion
                      (Math.sin(primaryPhase + 2 * Math.PI) * 0.4 + 
                       Math.sin(secondaryPhase + 2 * Math.PI) * 0.3 + 
                       Math.sin(tertiaryPhase + 2 * Math.PI) * 0.2 + 
                       Math.sin(microPhase + 2 * Math.PI) * 0.1) * amplitude
                    ],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={['#06B6D4', '#14B8A6', '#0EA5E9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientSegment}
          />
        </Animated.View>
      );
    }
    
    return segments;
  };
  
  return (
    <View style={styles.container}>
      <View style={[styles.stringContainer, { width: stringWidth }]}>
        {renderWaveSegments()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
    height: 60, // Increased to accommodate larger vibrations
  },
  stringContainer: {
    height: 40, // Increased height for bigger waves
    position: 'relative',
    overflow: 'visible', // Allow wave to extend slightly outside
  },
  waveSegment: {
    position: 'absolute',
    height: 2.5,
    borderRadius: 1.25,
    top: '50%',
    marginTop: -1.25,
    overflow: 'hidden',
    shadowColor: '#14B8A6',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
  },
  gradientSegment: {
    flex: 1,
    borderRadius: 1.25,
  },
});

export default AnimatedWaveString;
