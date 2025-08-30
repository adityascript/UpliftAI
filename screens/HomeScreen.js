import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ProgressIndicator from '../components/ProgressIndicator';
import CreateButton from '../components/CreateButton';
import PlaylistSection from '../components/PlaylistSection';
import QuickActions from '../components/QuickActions';

const HomeScreen = () => {
  // Get current time for dynamic greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

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
      colors={['#FFE135', '#FFF8DC']} // Dark yellow to lighter yellow gradient
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Greeting + Streak Summary */}
          <View style={styles.header}>
            <Text style={styles.greeting}>{getGreeting()}, Aditya!</Text>
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
    paddingTop: 40,
    paddingBottom: 8,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D2D2D',
    textAlign: 'left',
  },
  bottomSpacing: {
    height: 100, // Space for bottom navigation
  },
});

export default HomeScreen;
