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
    backgroundColor: 'rgba(228, 155, 123, 0.15)', // Light coral tint for "My Creations"
    borderRadius: 12,
    padding: 16,
    shadowColor: 'rgba(228, 155, 123, 0.3)', // Coral shadow
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 6,
    minHeight: 120,
    borderWidth: 1,
    borderColor: 'rgba(228, 155, 123, 0.2)', // Subtle coral border
  },
  suggestedCard: {
    backgroundColor: 'rgba(241, 235, 179, 0.85)', // Straw tint for suggested cards
    borderColor: 'rgba(228, 217, 111, 0.2)', // Straw border
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
    color: '#3F3B0C', // Dark straw for good contrast
    marginBottom: 4,
    lineHeight: 20,
  },
  subtitle: {
    fontSize: 12,
    color: '#7F7518', // Medium straw for subtitles
    lineHeight: 16,
  },
});

export default PlaylistCard;
