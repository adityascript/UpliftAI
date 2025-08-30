import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';

const SessionLengthScreen = ({ sessionData, updateSessionData, nextStep, prevStep }) => {
  const [selectedLength, setSelectedLength] = useState(sessionData.sessionLength);
  const [isCustom, setIsCustom] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(10);

  const presetOptions = [5, 10, 15];

  const handlePresetSelect = (minutes) => {
    setSelectedLength(minutes);
    setIsCustom(false);
  };

  const handleCustomSelect = () => {
    setIsCustom(true);
    setSelectedLength(customMinutes);
  };

  const handleCustomSliderChange = (value) => {
    const minutes = Math.round(value);
    setCustomMinutes(minutes);
    setSelectedLength(minutes);
  };

  const handleNext = () => {
    updateSessionData('sessionLength', selectedLength);
    nextStep();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>Session Length</Text>
        <Text style={styles.subtitle}>
          Choose how long you want your affirmation session to be
        </Text>

        {/* Preset Options */}
        <View style={styles.presetContainer}>
          <Text style={styles.sectionTitle}>Quick Options</Text>
          <View style={styles.presetGrid}>
            {presetOptions.map((minutes) => (
              <TouchableOpacity
                key={minutes}
                style={[
                  styles.presetButton,
                  selectedLength === minutes && !isCustom && styles.selectedPreset
                ]}
                onPress={() => handlePresetSelect(minutes)}
              >
                <Text style={[
                  styles.presetText,
                  selectedLength === minutes && !isCustom && styles.selectedPresetText
                ]}>
                  {minutes} min
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Custom Option */}
        <View style={styles.customContainer}>
          <TouchableOpacity
            style={[
              styles.customButton,
              isCustom && styles.selectedCustom
            ]}
            onPress={handleCustomSelect}
          >
            <Text style={[
              styles.customButtonText,
              isCustom && styles.selectedCustomText
            ]}>
              Custom
            </Text>
          </TouchableOpacity>

          {isCustom && (
            <View style={styles.sliderContainer}>
              <View style={styles.sliderHeader}>
                <Text style={styles.sliderLabel}>Duration: {customMinutes} minutes</Text>
                <Text style={styles.sliderRange}>1-30 min</Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={30}
                value={customMinutes}
                onValueChange={handleCustomSliderChange}
                minimumTrackTintColor="#6666FF"
                maximumTrackTintColor="rgba(204, 204, 255, 0.3)"
                thumbStyle={styles.sliderThumb}
                trackStyle={styles.sliderTrack}
              />
            </View>
          )}
        </View>

        {/* Session Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Session Summary</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Duration:</Text>
            <Text style={styles.infoValue}>{selectedLength} minutes</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Affirmations:</Text>
            <Text style={styles.infoValue}>{sessionData.affirmations?.length || 0} selected</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Est. time per affirmation:</Text>
            <Text style={styles.infoValue}>
              {sessionData.affirmations?.length > 0 
                ? Math.round((selectedLength * 60) / sessionData.affirmations.length) 
                : 0} seconds
            </Text>
          </View>
        </View>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={prevStep}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <LinearGradient
            colors={['#6666FF', '#9999FF']}
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
  presetContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#292966',
    marginBottom: 16,
  },
  presetGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  presetButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(204, 204, 255, 0.3)',
  },
  selectedPreset: {
    backgroundColor: '#6666FF',
    borderColor: '#6666FF',
  },
  presetText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5C5C99',
  },
  selectedPresetText: {
    color: '#FFFFFF',
  },
  customContainer: {
    marginBottom: 32,
  },
  customButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(204, 204, 255, 0.3)',
    marginBottom: 16,
  },
  selectedCustom: {
    backgroundColor: '#6666FF',
    borderColor: '#6666FF',
  },
  customButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5C5C99',
  },
  selectedCustomText: {
    color: '#FFFFFF',
  },
  sliderContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 20,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#292966',
  },
  sliderRange: {
    fontSize: 14,
    color: '#5C5C99',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderThumb: {
    backgroundColor: '#6666FF',
    width: 20,
    height: 20,
  },
  sliderTrack: {
    height: 6,
    borderRadius: 3,
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
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#5C5C99',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#292966',
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

export default SessionLengthScreen;
