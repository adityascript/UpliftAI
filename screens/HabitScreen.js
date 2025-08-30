import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StreakCalendar from '../components/StreakCalendar';

const HabitScreen = () => {
  return (
    <LinearGradient
      colors={['#0A2342', '#193566']} // Dark blue gradient
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        
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
    color: '#FFFFFF',
    textAlign: 'left',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#D1D5DB',
    textAlign: 'left',
  },
  insightsSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    marginHorizontal: 20,
    backgroundColor: 'rgba(30, 58, 138, 0.9)',
    borderRadius: 16,
    marginTop: 20,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 6,
  },
  insightsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#14B8A6',
    marginBottom: 8,
  },
  insightsText: {
    fontSize: 14,
    color: '#D1D5DB',
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 100, // Space for bottom navigation
  },
});

export default HabitScreen;
