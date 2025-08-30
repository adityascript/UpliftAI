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
    backgroundColor: 'rgba(30, 58, 138, 0.9)', // Navy with 90% opacity
    borderRadius: 12,
    padding: 16,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 6,
    minHeight: 120,
  },
  suggestedCard: {
    backgroundColor: 'rgba(30, 58, 138, 0.85)', // Slightly different opacity for suggested cards
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
    color: '#FFFFFF',
    marginBottom: 4,
    lineHeight: 20,
  },
  subtitle: {
    fontSize: 12,
    color: '#FFFFFF',
    lineHeight: 16,
  },
});

export default PlaylistCard;
