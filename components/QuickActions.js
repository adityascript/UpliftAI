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
    backgroundColor: 'rgba(30, 58, 138, 0.9)',
    borderRadius: 16,
    minWidth: 100,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 6,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default QuickActions;
