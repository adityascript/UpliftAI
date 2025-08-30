import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const VoiceStyleScreen = ({ sessionData, updateSessionData, nextStep, prevStep }) => {
  const [selectedPersona, setSelectedPersona] = useState(sessionData.persona);
  const [showCustomization, setShowCustomization] = useState(false);

  const personas = [
    {
      id: 'sophia',
      name: 'Sophia',
      tagline: 'Gentle Guide',
      gender: 'Female',
      tone: 'Calm',
      pace: 'Meditative',
      icon: '🌙',
      gradient: ['#E8F4FD', '#B3D9F2']
    },
    {
      id: 'aria',
      name: 'Aria',
      tagline: 'Warm Companion',
      gender: 'Female',
      tone: 'Warm',
      pace: 'Normal',
      icon: '🌸',
      gradient: ['#FFE6F2', '#FFB3D9']
    },
    {
      id: 'ethan',
      name: 'Ethan',
      tagline: 'Steady Motivator',
      gender: 'Male',
      tone: 'Warm',
      pace: 'Normal',
      icon: '💪',
      gradient: ['#E6F7FF', '#B3E0FF']
    },
    {
      id: 'liam',
      name: 'Liam',
      tagline: 'Energetic Coach',
      gender: 'Male',
      tone: 'Energetic',
      pace: 'Fast',
      icon: '⚡',
      gradient: ['#FFF2E6', '#FFD9B3']
    }
  ];

  const handlePersonaSelect = (persona) => {
    setSelectedPersona(persona);
  };

  const handlePreview = (persona) => {
    // In a real app, this would play a sample audio
    console.log(`Playing preview for ${persona.name}`);
  };

  const handleNext = () => {
    updateSessionData('persona', selectedPersona);
    nextStep();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>Choose your voice</Text>
        <Text style={styles.subtitle}>
          Select a persona that resonates with your energy
        </Text>

        {/* Persona Cards */}
        <View style={styles.personasContainer}>
          {personas.map((persona) => (
            <TouchableOpacity
              key={persona.id}
              style={[
                styles.personaCard,
                selectedPersona?.id === persona.id && styles.selectedPersonaCard
              ]}
              onPress={() => handlePersonaSelect(persona)}
            >
              <LinearGradient
                colors={persona.gradient}
                style={styles.personaGradient}
              >
                <View style={styles.personaHeader}>
                  <Text style={styles.personaIcon}>{persona.icon}</Text>
                  <View style={styles.personaInfo}>
                    <Text style={styles.personaName}>{persona.name}</Text>
                    <Text style={styles.personaTagline}>{persona.tagline}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.previewButton}
                    onPress={() => handlePreview(persona)}
                  >
                    <Ionicons name="play-circle" size={32} color="#6666FF" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.personaDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Gender:</Text>
                    <Text style={styles.detailValue}>{persona.gender}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Tone:</Text>
                    <Text style={styles.detailValue}>{persona.tone}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Pace:</Text>
                    <Text style={styles.detailValue}>{persona.pace}</Text>
                  </View>
                </View>

                {selectedPersona?.id === persona.id && (
                  <View style={styles.selectedIndicator}>
                    <Ionicons name="checkmark-circle" size={24} color="#6666FF" />
                    <Text style={styles.selectedText}>Selected</Text>
                  </View>
                )}
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Customization Option */}
        <TouchableOpacity
          style={styles.customizationButton}
          onPress={() => setShowCustomization(!showCustomization)}
        >
          <Text style={styles.customizationText}>Customize voice settings</Text>
          <Ionicons 
            name={showCustomization ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#6666FF" 
          />
        </TouchableOpacity>

        {showCustomization && (
          <View style={styles.customizationContainer}>
            <Text style={styles.customizationTitle}>Advanced Settings</Text>
            <Text style={styles.customizationSubtitle}>
              Fine-tune your voice preferences
            </Text>
            {/* Add gender, tone, speed selectors here */}
            <View style={styles.customizationPlaceholder}>
              <Text style={styles.placeholderText}>
                Gender, Tone, and Speed controls will be implemented here
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={prevStep}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.nextButton, !selectedPersona && styles.disabledButton]}
          onPress={handleNext}
          disabled={!selectedPersona}
        >
          <LinearGradient
            colors={!selectedPersona ? ['#A3A3CC', '#CCCCFF'] : ['#6666FF', '#9999FF']}
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
  personasContainer: {
    marginBottom: 24,
  },
  personaCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedPersonaCard: {
    borderWidth: 3,
    borderColor: '#6666FF',
  },
  personaGradient: {
    padding: 20,
  },
  personaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  personaIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  personaInfo: {
    flex: 1,
  },
  personaName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#292966',
    marginBottom: 2,
  },
  personaTagline: {
    fontSize: 14,
    color: '#5C5C99',
  },
  previewButton: {
    padding: 4,
  },
  personaDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 12,
    color: '#5C5C99',
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '500',
    color: '#292966',
  },
  selectedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  selectedText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6666FF',
    marginLeft: 4,
  },
  customizationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  customizationText: {
    fontSize: 16,
    color: '#6666FF',
    fontWeight: '500',
  },
  customizationContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  customizationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#292966',
    marginBottom: 8,
  },
  customizationSubtitle: {
    fontSize: 14,
    color: '#5C5C99',
    marginBottom: 16,
  },
  customizationPlaceholder: {
    backgroundColor: 'rgba(204, 204, 255, 0.1)',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 14,
    color: '#5C5C99',
    textAlign: 'center',
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

export default VoiceStyleScreen;
