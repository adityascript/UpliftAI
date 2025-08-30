import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StreakCalendar from '../components/StreakCalendar';

const HabitScreen = () => {
  return (
    <LinearGradient
      colors={['#FFE135', '#FFF8DC']} // Same gradient as other screens
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Habit Tracker</Text>
            <Text style={styles.subtitle}>Track your daily affirmation listening</Text>
          </View>

          {/* Calendar Section */}
          <StreakCalendar />

          {/* Additional habit insights could go here */}
          <View style={styles.insightsSection}>
            <Text style={styles.insightsTitle}>Keep up the great work!</Text>
            <Text style={styles.insightsText}>
              Consistency is key to building positive habits. Every day you listen to your affirmations 
              brings you closer to your goals.
            </Text>
          </View>

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
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D2D2D',
    textAlign: 'left',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'left',
  },
  insightsSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  insightsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D5016',
    marginBottom: 8,
  },
  insightsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 100, // Space for bottom navigation
  },
});

export default HabitScreen;
