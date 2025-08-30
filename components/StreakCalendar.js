import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StreakCalendar = () => {
  // Get current date info
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDate = now.getDate();
  
  // Get number of days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Generate streak data for the current month (sample data - in real app this would come from user data)
  const generateStreakData = () => {
    const data = [];
    for (let day = 1; day <= daysInMonth; day++) {
      if (day > currentDate) {
        // Future days - no data
        data.push('future');
      } else {
        // Past and current days - random data for demo (replace with real user data)
        const rand = Math.random();
        if (rand > 0.8) {
          data.push('missed');
        } else {
          data.push('achieved');
        }
      }
    }
    return data;
  };

  const streakData = generateStreakData();
  
  // Calculate current streak
  const calculateCurrentStreak = () => {
    let streak = 0;
    for (let i = currentDate - 1; i >= 0; i--) {
      if (streakData[i] === 'achieved') {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const currentStreak = calculateCurrentStreak();

  const renderCalendarDay = (status, index) => {
    let dayStyle = styles.calendarDay;
    const dayNumber = index + 1;
    const isToday = dayNumber === currentDate;
    const isFuture = status === 'future';

    switch (status) {
      case 'achieved':
        dayStyle = [styles.calendarDay, styles.achieved];
        break;
      case 'missed':
        dayStyle = [styles.calendarDay, styles.missed];
        break;
      case 'future':
        dayStyle = [styles.calendarDay, styles.future];
        break;
      default:
        break;
    }

    // Add today highlight
    if (isToday) {
      dayStyle = [...dayStyle, styles.today];
    }

    return (
      <View key={index} style={dayStyle}>
        <Text style={[
          styles.dayNumber,
          isFuture && styles.futureText,
          isToday && styles.todayText
        ]}>
          {dayNumber}
        </Text>
      </View>
    );
  };

  // Get month name
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentMonthName = monthNames[currentMonth];

  return (
    <View style={styles.container}>
      <View style={styles.streakHeader}>
        <Text style={styles.streakText}>🔥 {currentStreak}-day streak</Text>
        <Text style={styles.monthText}>{currentMonthName} {currentYear}</Text>
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
    color: '#E49B7B', // Coral for streak text - strong accent
  },
  monthText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#BEB024', // Light straw shade
    marginTop: 4,
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
    backgroundColor: '#E49B7B', // Coral for achieved days - strong contrast
  },
  missed: {
    backgroundColor: '#D3D3D3', // Gray
  },
  future: {
    backgroundColor: '#F0F0F0', // Very light gray for future days
    opacity: 0.5,
  },
  today: {
    borderWidth: 2,
    borderColor: '#E49B7B', // Coral border for today
  },
  dayNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2D2D2D',
  },
  futureText: {
    color: '#A0A0A0',
  },
  todayText: {
    fontWeight: '700',
    color: '#E49B7B', // Coral for today's text
  },
});

export default StreakCalendar;
