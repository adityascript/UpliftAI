import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StreakCalendar = () => {
  // Sample data for the last 21 days (simplified to achieved/missed only)
  const streakData = [
    'achieved', 'achieved', 'missed', 'achieved', 'achieved', 'achieved', 'achieved',
    'achieved', 'achieved', 'missed', 'achieved', 'achieved', 'achieved', 'achieved',
    'achieved', 'achieved', 'achieved', 'achieved', 'missed', 'achieved', 'achieved'
  ];

  const currentStreak = 4; // Calculate current streak

  const renderCalendarDay = (status, index) => {
    let dayStyle = styles.calendarDay;
    const dayNumber = index + 1;

    switch (status) {
      case 'achieved':
        dayStyle = [styles.calendarDay, styles.achieved];
        break;
      case 'missed':
        dayStyle = [styles.calendarDay, styles.missed];
        break;
      default:
        break;
    }

    return (
      <View key={index} style={dayStyle}>
        <Text style={styles.dayNumber}>{dayNumber}</Text>
      </View>
    );
  };

        return (
        <View style={styles.container}>
          <View style={styles.streakHeader}>
            <Text style={styles.streakText}>🔥 {currentStreak}-day streak</Text>
          </View>
          <View style={styles.calendarContainer}>
            {streakData.map((status, index) => renderCalendarDay(status, index))}
          </View>
        </View>
      );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  streakHeader: {
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  streakText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D5016',
  },
  calendarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  calendarDay: {
    width: 32,
    height: 32,
    borderRadius: 16,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D3D3D3', // Default gray
  },
  achieved: {
    backgroundColor: '#B8E6B8', // Lighter green
  },
  missed: {
    backgroundColor: '#D3D3D3', // Gray
  },
  dayNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2D2D2D',
  },
});

export default StreakCalendar;
