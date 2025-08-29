import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const MeditationSilhouette = ({ size = 50 }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Sun/Background gradient */}
      <LinearGradient
        colors={['#FFE135', '#FF8C00']}
        style={styles.background}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      
      {/* Meditation silhouette */}
      <View style={styles.silhouette}>
        {/* Head */}
        <View style={[styles.head, { 
          width: size * 0.16, 
          height: size * 0.2,
          top: size * 0.1 
        }]} />
        
        {/* Body */}
        <View style={[styles.body, { 
          width: size * 0.24, 
          height: size * 0.36,
          top: size * 0.25 
        }]} />
        
        {/* Left leg */}
        <View style={[styles.leftLeg, { 
          width: size * 0.16, 
          height: size * 0.08,
          top: size * 0.55,
          left: size * 0.18 
        }]} />
        
        {/* Right leg */}
        <View style={[styles.rightLeg, { 
          width: size * 0.16, 
          height: size * 0.08,
          top: size * 0.55,
          right: size * 0.18 
        }]} />
        
        {/* Left arm */}
        <View style={[styles.leftArm, { 
          width: size * 0.06, 
          height: size * 0.16,
          top: size * 0.32,
          left: size * 0.25 
        }]} />
        
        {/* Right arm */}
        <View style={[styles.rightArm, { 
          width: size * 0.06, 
          height: size * 0.16,
          top: size * 0.32,
          right: size * 0.25 
        }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderRadius: 25,
    overflow: 'hidden',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.8,
  },
  silhouette: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  head: {
    position: 'absolute',
    backgroundColor: '#2D2D2D',
    borderRadius: 50,
    opacity: 0.9,
  },
  body: {
    position: 'absolute',
    backgroundColor: '#2D2D2D',
    borderRadius: 50,
    opacity: 0.9,
  },
  leftLeg: {
    position: 'absolute',
    backgroundColor: '#2D2D2D',
    borderRadius: 50,
    opacity: 0.9,
    transform: [{ rotate: '-30deg' }],
  },
  rightLeg: {
    position: 'absolute',
    backgroundColor: '#2D2D2D',
    borderRadius: 50,
    opacity: 0.9,
    transform: [{ rotate: '30deg' }],
  },
  leftArm: {
    position: 'absolute',
    backgroundColor: '#2D2D2D',
    borderRadius: 50,
    opacity: 0.9,
    transform: [{ rotate: '-20deg' }],
  },
  rightArm: {
    position: 'absolute',
    backgroundColor: '#2D2D2D',
    borderRadius: 50,
    opacity: 0.9,
    transform: [{ rotate: '20deg' }],
  },
});

export default MeditationSilhouette;
