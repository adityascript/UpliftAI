import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AnimatedWaveform from './AnimatedWaveform';

const ProgressIndicator = () => {
  // Get current date info
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDate = now.getDate();
  
  // Get month name (short form)
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const currentMonthName = monthNames[currentMonth];
  
  // Calculate days passed in current month
  const daysPassedThisMonth = currentDate;
  
  // Sample data for days listened (in real app, this would come from user data/state)
  // For demo, let's say user listened on about 70% of days
  const calculateDaysListened = () => {
    // This is sample logic - replace with actual user data
    const sampleListenedDays = Math.floor(daysPassedThisMonth * 0.7);
    return Math.max(1, sampleListenedDays); // Ensure at least 1 day for demo
  };
  
  const daysListened = calculateDaysListened();
  
  return (
    <View style={styles.container}>
      <View style={styles.progressRow}>
        <Ionicons name="headset-outline" size={16} color="#93C5FD" style={styles.icon} />
        <Text style={styles.progressText}>
          <Text style={styles.highlight}>{daysListened}/{daysPassedThisMonth}</Text>
          <Text style={styles.normalText}> days listened in {currentMonthName}</Text>
        </Text>
      </View>
      <AnimatedWaveform />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  progressText: {
    fontSize: 16,
    lineHeight: 20,
  },
  highlight: {
    fontWeight: '600',
    color: '#FFFFFF', // White for main numbers
  },
  normalText: {
    fontWeight: '400',
    color: '#D1D5DB', // Light gray for subtext
  },
});

export default ProgressIndicator;
