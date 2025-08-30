import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ProgressIndicator from '../components/ProgressIndicator';
import CreateButton from '../components/CreateButton';
import PlaylistSection from '../components/PlaylistSection';
import QuickActions from '../components/QuickActions';

const HomeScreen = () => {
  // User name - in a real app, this would come from authentication/user context
  const userName = 'Aditya'; // This would be dynamically fetched from user state/context

  // Sample data for My Creations
  const myCreations = [
    { title: 'Morning Motivation', subtitle: '5 affirmations' },
    { title: 'Confidence Boost', subtitle: '8 affirmations' },
    { title: 'Career Success', subtitle: '6 affirmations' },
    { title: 'Health & Wellness', subtitle: '4 affirmations' },
  ];

  // Sample data for Suggested playlists
  const suggestedPlaylists = [
    { title: 'Self-Love Journey', subtitle: 'Popular choice' },
    { title: 'Productivity Power', subtitle: 'Trending now' },
    { title: 'Stress Relief', subtitle: 'Calming vibes' },
    { title: 'New Beginnings', subtitle: 'Fresh start' },
    { title: 'Inner Peace', subtitle: 'Mindfulness' },
  ];

  const handleCreatePress = () => {
    console.log('Create button pressed');
    // TODO: Navigate to create affirmation screen
  };

  return (
    <LinearGradient
      colors={['#D8C830', '#F6F2CE']} // Straw gradient (darker to lighter tint)
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Greeting + Streak Summary */}
          <View style={styles.header}>
            <Text style={styles.greeting}>Keep Shining, {userName} ✨</Text>
          </View>

          {/* Progress Indicator */}
          <ProgressIndicator />

          {/* Primary Create Button */}
          <CreateButton onPress={handleCreatePress} />

          {/* My Creations Section */}
          <PlaylistSection 
            title="My Creations" 
            playlists={myCreations} 
            type="created"
          />

          {/* Suggested for You Section */}
          <PlaylistSection 
            title="Suggested for You" 
            playlists={suggestedPlaylists} 
            type="suggested"
          />

          {/* Quick Actions */}
          <QuickActions />

          {/* Bottom spacing for navigation */}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40, // Extra padding for iOS notch
    paddingBottom: 12,
    marginTop: Platform.OS === 'android' ? 24 : 0, // Additional margin for Android
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800', // Slightly bolder for friendlier tone
    color: '#3F3B0C', // Dark straw shade for high contrast
    textAlign: 'left',
    letterSpacing: 0.5, // Slight letter spacing for better readability
  },
  bottomSpacing: {
    height: 100, // Space for bottom navigation
  },
});

export default HomeScreen;
