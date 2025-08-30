import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';



const AnimatedWaveString = () => {
  const screenWidth = Dimensions.get('window').width;
  const stringWidth = screenWidth * 0.9; // 90% of screen width for better span
  const numSegments = 120; // More segments for smooth serpentine curves
  
  const animationValue = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    const waveAnimation = Animated.loop(
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 4000, // Slower for smooth flowing motion
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
      
      // Create amplitude envelope - stronger in middle, weaker at ends (like reference image)
      const centerDistance = Math.abs(progress - 0.5) * 2; // 0 at center, 1 at ends
      const amplitudeEnvelope = Math.cos(centerDistance * Math.PI / 2); // Smooth falloff
      const maxAmplitude = 25; // Large amplitude for pronounced coils
      const amplitude = maxAmplitude * amplitudeEnvelope;
      
      // Create tight serpentine coils like in the reference image
      const coilFrequency = 12; // Number of complete coils across the string
      const wavePhase = progress * coilFrequency * Math.PI * 2;
      
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
                      // Serpentine wave pattern flowing horizontally
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
    height: 80, // Increased to accommodate serpentine coils
  },
  stringContainer: {
    height: 60, // Much larger height for coiled wave pattern
    position: 'relative',
    overflow: 'visible', // Allow wave to extend outside
  },
  waveSegment: {
    position: 'absolute',
    height: 2.5,
    borderRadius: 1.25,
    top: '50%',
    marginTop: -1.25,
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
    borderRadius: 1.25,
  },
});

export default AnimatedWaveString;
