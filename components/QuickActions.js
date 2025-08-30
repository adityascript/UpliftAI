import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const QuickActions = () => {
  const handleSchedule = () => {
    console.log('Schedule pressed');
    // TODO: Navigate to schedule screen
  };

  const handleDailySuggestion = () => {
    console.log('Daily Suggestion pressed');
    // TODO: Show daily suggestion modal or navigate to suggestions
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.actionButton} onPress={handleSchedule} activeOpacity={0.7}>
        <Text style={styles.actionIcon}>📅</Text>
        <Text style={styles.actionText}>Schedule</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.actionButton} onPress={handleDailySuggestion} activeOpacity={0.7}>
        <Text style={styles.actionIcon}>💭</Text>
        <Text style={styles.actionText}>Daily Suggestion</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    marginVertical: 20,
  },
  actionButton: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(241, 235, 179, 0.9)', // Light straw background
    borderRadius: 16,
    minWidth: 100,
    shadowColor: 'rgba(228, 155, 123, 0.4)', // Coral shadow for accent
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(228, 155, 123, 0.2)', // Subtle coral border
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3F3B0C', // Dark straw text
    textAlign: 'center',
  },
});

export default QuickActions;
