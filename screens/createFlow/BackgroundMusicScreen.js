import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const BackgroundMusicScreen = ({ sessionData, updateSessionData, nextStep, prevStep }) => {
  const [selectedMusic, setSelectedMusic] = useState(sessionData.backgroundMusic);

  const musicOptions = [
    {
      id: 'none',
      name: 'None',
      description: 'Voice only, no background music',
      icon: '🔇',
      gradient: ['#F5F5F5', '#E0E0E0']
    },
    {
      id: 'binaural',
      name: 'Binaural Beats',
      description: 'Deep focus and relaxation frequencies',
      icon: '🧠',
      gradient: ['#E8F4FD', '#B3D9F2']
    },
    {
      id: 'alpha',
      name: 'Alpha Waves',
      description: 'Calming brainwave synchronization',
      icon: '🌊',
      gradient: ['#E6F7FF', '#B3E0FF']
    },
    {
      id: 'beta',
      name: 'Beta Waves',
      description: 'Enhanced focus and alertness',
      icon: '⚡',
      gradient: ['#FFF2E6', '#FFD9B3']
    },
    {
      id: 'ambient',
      name: 'Ambient Nature',
      description: 'Soothing natural sounds',
      icon: '🌿',
      gradient: ['#E6FFE6', '#B3FFB3']
    },
    {
      id: 'piano',
      name: 'Soft Piano',
      description: 'Gentle instrumental melodies',
      icon: '🎹',
      gradient: ['#FFE6F2', '#FFB3D9']
    }
  ];

  const handleMusicSelect = (music) => {
    setSelectedMusic(music);
  };

  const handlePreview = (music) => {
    // In a real app, this would play a sample audio
    console.log(`Playing preview for ${music.name}`);
  };

  const handleNext = () => {
    updateSessionData('backgroundMusic', selectedMusic);
    nextStep();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>Background Music</Text>
        <Text style={styles.subtitle}>
          Choose ambient sounds to enhance your experience
        </Text>

        {/* Music Options */}
        <View style={styles.musicContainer}>
          {musicOptions.map((music) => (
            <TouchableOpacity
              key={music.id}
              style={[
                styles.musicCard,
                selectedMusic?.id === music.id && styles.selectedMusicCard
              ]}
              onPress={() => handleMusicSelect(music)}
            >
              <LinearGradient
                colors={music.gradient}
                style={styles.musicGradient}
              >
                <View style={styles.musicHeader}>
                  <Text style={styles.musicIcon}>{music.icon}</Text>
                  <View style={styles.musicInfo}>
                    <Text style={styles.musicName}>{music.name}</Text>
                    <Text style={styles.musicDescription}>{music.description}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.previewButton}
                    onPress={() => handlePreview(music)}
                  >
                    <Ionicons name="play-circle" size={32} color="#6666FF" />
                  </TouchableOpacity>
                </View>

                {selectedMusic?.id === music.id && (
                  <View style={styles.selectedIndicator}>
                    <Ionicons name="checkmark-circle" size={24} color="#6666FF" />
                    <Text style={styles.selectedText}>Selected</Text>
                  </View>
                )}
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Music Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>About Background Music</Text>
          <Text style={styles.infoText}>
            Background music can enhance your affirmation experience by creating a more immersive and calming environment. Choose the option that best supports your mood and goals.
          </Text>
        </View>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={prevStep}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.nextButton, !selectedMusic && styles.disabledButton]}
          onPress={handleNext}
          disabled={!selectedMusic}
        >
          <LinearGradient
            colors={!selectedMusic ? ['#A3A3CC', '#CCCCFF'] : ['#6666FF', '#9999FF']}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Next</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#292966',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#5C5C99',
    marginBottom: 32,
    lineHeight: 22,
  },
  musicContainer: {
    marginBottom: 24,
  },
  musicCard: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedMusicCard: {
    borderWidth: 3,
    borderColor: '#6666FF',
  },
  musicGradient: {
    padding: 20,
  },
  musicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  musicIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  musicInfo: {
    flex: 1,
  },
  musicName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#292966',
    marginBottom: 4,
  },
  musicDescription: {
    fontSize: 14,
    color: '#5C5C99',
    lineHeight: 18,
  },
  previewButton: {
    padding: 4,
  },
  selectedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 12,
  },
  selectedText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6666FF',
    marginLeft: 4,
  },
  infoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#292966',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#5C5C99',
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  backButton: {
    flex: 1,
    marginRight: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5C5C99',
  },
  nextButton: {
    flex: 1,
    marginLeft: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default BackgroundMusicScreen;
