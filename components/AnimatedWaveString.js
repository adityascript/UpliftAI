import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AnimatedWaveString = () => {
  const screenWidth = Dimensions.get('window').width;
  const stringWidth = screenWidth * 0.9; // 90% of screen width
  const numSegments = 200; // More segments for smoother continuous line
  
  const animationValue = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    const waveAnimation = Animated.loop(
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 3000, // Smooth flowing motion
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
      
      // Horizontal progress along the string (0 to 1)
      const progress = i / (numSegments - 1);
      
      // Create amplitude envelope - stronger in middle, weaker at ends
      const centerDistance = Math.abs(progress - 0.5) * 2; // 0 at center, 1 at ends
      const amplitudeEnvelope = Math.cos(centerDistance * Math.PI / 2); // Smooth falloff
      const maxAmplitude = 20; // Amplitude for wave motion
      const amplitude = maxAmplitude * amplitudeEnvelope;
      
      // Create smooth wave pattern
      const waveFrequency = 8; // Number of complete waves across the string
      const wavePhase = progress * waveFrequency * Math.PI * 2;
      
      segments.push(
        <Animated.View
          key={i}
          style={[
            styles.waveSegment,
            {
              left: x,
              width: segmentWidth + 1, // Slight overlap for seamless continuous line
              transform: [
                {
                  translateY: animationValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [
                      Math.sin(wavePhase) * amplitude,
                      Math.sin(wavePhase + 2 * Math.PI) * amplitude
                    ],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={['#9999FF', '#CCCCFF', '#D5D5FF']}
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
    paddingVertical: 20,
    height: 60, // Appropriate height for wave motion
  },
  stringContainer: {
    height: 40, // Height for wave pattern
    position: 'relative',
    overflow: 'visible', // Allow wave to extend outside
  },
  waveSegment: {
    position: 'absolute',
    height: 3, // Slightly thicker for better visibility
    borderRadius: 1.5,
    top: '50%',
    marginTop: -1.5,
    overflow: 'hidden',
    shadowColor: '#9999FF',
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
    borderRadius: 1.5,
  },
});

export default AnimatedWaveString;
