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
    backgroundColor: 'rgba(204, 204, 255, 0.9)', // Periwinkle background for "My Creations"
    borderRadius: 12,
    padding: 16,
    shadowColor: 'rgba(153, 153, 255, 0.5)', // Periwinkle shadow
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 6,
    minHeight: 120,
    borderWidth: 1,
    borderColor: 'rgba(204, 204, 255, 0.3)', // Periwinkle border
  },
  suggestedCard: {
    backgroundColor: 'rgba(213, 213, 255, 0.85)', // Light periwinkle for suggested cards
    borderColor: 'rgba(204, 204, 255, 0.3)', // Periwinkle border
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
    color: '#292966', // Dark periwinkle for excellent contrast
    marginBottom: 4,
    lineHeight: 20,
  },
  subtitle: {
    fontSize: 12,
    color: '#5C5C99', // Medium periwinkle for subtitles
    lineHeight: 16,
  },
});

export default PlaylistCard;
