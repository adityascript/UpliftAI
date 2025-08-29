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
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2D2D2D',
    textAlign: 'center',
  },
});

export default QuickActions;
