import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const LoopingRepeatsScreen = ({ sessionData, updateSessionData, nextStep, prevStep }) => {
  const [selectedMode, setSelectedMode] = useState(sessionData.loopingMode);

  const loopModes = [
    {
      id: 'no-repeat',
      name: 'No repeat',
      description: 'Each affirmation plays once',
      icon: '▶️',
      gradient: ['#E8F4FD', '#B3D9F2']
    },
    {
      id: 'repeat-1x',
      name: 'Repeat each (1x)',
      description: 'Each affirmation plays twice',
      icon: '🔄',
      gradient: ['#E6F7FF', '#B3E0FF']
    },
    {
      id: 'repeat-2x',
      name: 'Repeat each (2x)',
      description: 'Each affirmation plays three times',
      icon: '🔄🔄',
      gradient: ['#FFF2E6', '#FFD9B3']
    },
    {
      id: 'repeat-3x',
      name: 'Repeat each (3x)',
      description: 'Each affirmation plays four times',
      icon: '🔄🔄🔄',
      gradient: ['#FFE6F2', '#FFB3D9']
    },
    {
      id: 'loop-playlist',
      name: 'Loop playlist',
      description: 'Entire playlist repeats until session ends',
      icon: '♾️',
      gradient: ['#E6FFE6', '#B3FFB3']
    }
  ];

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
  };

  const handleNext = () => {
    updateSessionData('loopingMode', selectedMode);
    nextStep();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>Looping & Repeats</Text>
        <Text style={styles.subtitle}>
          Choose how your affirmations will be repeated
        </Text>

        {/* Loop Mode Options */}
        <View style={styles.modesContainer}>
          {loopModes.map((mode) => (
            <TouchableOpacity
              key={mode.id}
              style={[
                styles.modeCard,
                selectedMode?.id === mode.id && styles.selectedModeCard
              ]}
              onPress={() => handleModeSelect(mode)}
            >
              <LinearGradient
                colors={mode.gradient}
                style={styles.modeGradient}
              >
                <View style={styles.modeHeader}>
                  <Text style={styles.modeIcon}>{mode.icon}</Text>
                  <View style={styles.modeInfo}>
                    <Text style={styles.modeName}>{mode.name}</Text>
                    <Text style={styles.modeDescription}>{mode.description}</Text>
                  </View>
                  {selectedMode?.id === mode.id && (
                    <Ionicons name="checkmark-circle" size={32} color="#6666FF" />
                  )}
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Session Preview */}
        <View style={styles.previewContainer}>
          <Text style={styles.previewTitle}>Session Preview</Text>
          <View style={styles.previewContent}>
            <View style={styles.previewRow}>
              <Text style={styles.previewLabel}>Total affirmations:</Text>
              <Text style={styles.previewValue}>{sessionData.affirmations?.length || 0}</Text>
            </View>
            <View style={styles.previewRow}>
              <Text style={styles.previewLabel}>Session duration:</Text>
              <Text style={styles.previewValue}>{sessionData.sessionLength} minutes</Text>
            </View>
            <View style={styles.previewRow}>
              <Text style={styles.previewLabel}>Looping mode:</Text>
              <Text style={styles.previewValue}>{selectedMode?.name || 'Not selected'}</Text>
            </View>
            <View style={styles.previewRow}>
              <Text style={styles.previewLabel}>Est. total plays:</Text>
              <Text style={styles.previewValue}>
                {selectedMode?.id === 'no-repeat' 
                  ? sessionData.affirmations?.length || 0
                  : selectedMode?.id === 'repeat-1x'
                  ? (sessionData.affirmations?.length || 0) * 2
                  : selectedMode?.id === 'repeat-2x'
                  ? (sessionData.affirmations?.length || 0) * 3
                  : selectedMode?.id === 'repeat-3x'
                  ? (sessionData.affirmations?.length || 0) * 4
                  : 'Continuous'
                }
              </Text>
            </View>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>About Looping</Text>
          <Text style={styles.infoText}>
            Repetition helps reinforce positive affirmations in your mind. Choose a mode that feels comfortable and effective for your practice.
          </Text>
        </View>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={prevStep}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.nextButton, !selectedMode && styles.disabledButton]}
          onPress={handleNext}
          disabled={!selectedMode}
        >
          <LinearGradient
            colors={!selectedMode ? ['#A3A3CC', '#CCCCFF'] : ['#6666FF', '#9999FF']}
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
  modesContainer: {
    marginBottom: 24,
  },
  modeCard: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedModeCard: {
    borderWidth: 3,
    borderColor: '#6666FF',
  },
  modeGradient: {
    padding: 20,
  },
  modeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modeIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  modeInfo: {
    flex: 1,
  },
  modeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#292966',
    marginBottom: 4,
  },
  modeDescription: {
    fontSize: 14,
    color: '#5C5C99',
    lineHeight: 18,
  },
  previewContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#292966',
    marginBottom: 16,
  },
  previewContent: {
    gap: 8,
  },
  previewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  previewLabel: {
    fontSize: 14,
    color: '#5C5C99',
  },
  previewValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#292966',
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

export default LoopingRepeatsScreen;
