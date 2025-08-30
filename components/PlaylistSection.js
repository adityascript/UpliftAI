import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import PlaylistCard from './PlaylistCard';

const PlaylistSection = ({ title, playlists, type = 'created' }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        style={styles.scrollView}
      >
        {playlists.map((playlist, index) => (
          <PlaylistCard
            key={index}
            title={playlist.title}
            subtitle={playlist.subtitle}
            type={type}
            onPress={() => {
              console.log(`Pressed ${playlist.title}`);
              // TODO: Navigate to playlist detail
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 20,
    marginBottom: 16,
  },
  scrollView: {
    paddingLeft: 20,
  },
  scrollContainer: {
    paddingRight: 20,
  },
});

export default PlaylistSection;
