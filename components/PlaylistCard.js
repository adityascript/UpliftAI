import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MeditationSilhouette from './MeditationSilhouette';

const PlaylistCard = ({ title, subtitle, onPress, type = 'created' }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.card, type === 'suggested' && styles.suggestedCard]}>
        <View style={styles.iconContainer}>
          {type === 'created' ? (
            <MeditationSilhouette size={40} />
          ) : (
            <Text style={styles.icon}>💡</Text>
          )}
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        {subtitle && (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
    width: 160,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 120,
  },
  suggestedCard: {
    backgroundColor: '#FFFEF7', // Slightly warmer white for suggested cards
  },
  iconContainer: {
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  icon: {
    fontSize: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: 4,
    lineHeight: 20,
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
});

export default PlaylistCard;
