import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const SuggestedAffirmationsScreen = ({ sessionData, updateSessionData, nextStep, prevStep }) => {
  const [selectedAffirmations, setSelectedAffirmations] = useState(sessionData.affirmations || []);
  const [customAffirmation, setCustomAffirmation] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Suggested affirmations based on category
  const getSuggestedAffirmations = (category) => {
    const suggestions = {
      'Love & Relationships': [
        'I am worthy of love and respect',
        'I attract healthy and loving relationships',
        'I communicate openly and honestly',
        'I am patient and understanding',
        'I trust in the power of love',
        'I am surrounded by people who care about me',
        'I give and receive love freely',
        'I am confident in expressing my feelings',
        'I create meaningful connections',
        'I am deserving of deep, lasting love'
      ],
      'Career & Success': [
        'I am capable of achieving great success',
        'I attract opportunities that align with my goals',
        'I am confident in my professional abilities',
        'I handle challenges with grace and determination',
        'I am a valuable asset to any team',
        'I continuously grow and improve my skills',
        'I am worthy of recognition and advancement',
        'I make decisions that benefit my career growth',
        'I am focused and productive in my work',
        'I create success through my positive mindset'
      ],
      'Full Potential': [
        'I am unlocking my full potential every day',
        'I have unlimited possibilities within me',
        'I am growing stronger and more capable',
        'I embrace challenges as opportunities to grow',
        'I am becoming the best version of myself',
        'I trust in my abilities and inner wisdom',
        'I am constantly evolving and improving',
        'I have the power to create positive change',
        'I am worthy of all the good things life offers',
        'I am living up to my highest potential'
      ],
      'Inner Peace': [
        'I am at peace with myself and the world',
        'I find calmness in every situation',
        'I trust the journey of life',
        'I am centered and balanced',
        'I release what I cannot control',
        'I find peace in the present moment',
        'I am grateful for all that I have',
        'I choose peace over worry',
        'I am connected to my inner wisdom',
        'I radiate peace and tranquility'
      ],
      'Well-being': [
        'I prioritize my health and well-being',
        'I am strong, healthy, and vibrant',
        'I make choices that support my wellness',
        'I am grateful for my body and mind',
        'I have the energy to accomplish my goals',
        'I am healing and growing every day',
        'I listen to my body\'s needs',
        'I am worthy of self-care and rest',
        'I am becoming healthier each day',
        'I am in harmony with my mind and body'
      ],
      'Other': [
        'I am capable of achieving my goals',
        'I trust in my abilities and decisions',
        'I am worthy of happiness and success',
        'I attract positive experiences into my life',
        'I am confident and self-assured',
        'I have the power to create change',
        'I am resilient and adaptable',
        'I am surrounded by love and support',
        'I am becoming better every day',
        'I am exactly where I need to be'
      ]
    };
    return suggestions[category] || suggestions['Other'];
  };

  const suggestedAffirmations = getSuggestedAffirmations(sessionData.category);

  const toggleAffirmation = (affirmation) => {
    if (selectedAffirmations.includes(affirmation)) {
      setSelectedAffirmations(selectedAffirmations.filter(a => a !== affirmation));
    } else if (selectedAffirmations.length < 15) {
      setSelectedAffirmations([...selectedAffirmations, affirmation]);
    }
  };

  const addCustomAffirmation = () => {
    if (customAffirmation.trim() && selectedAffirmations.length < 15) {
      setSelectedAffirmations([...selectedAffirmations, customAffirmation.trim()]);
      setCustomAffirmation('');
      setShowCustomInput(false);
    }
  };

  const removeAffirmation = (affirmation) => {
    setSelectedAffirmations(selectedAffirmations.filter(a => a !== affirmation));
  };

  const handleNext = () => {
    updateSessionData('affirmations', selectedAffirmations);
    nextStep();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>Choose your affirmations</Text>
        <Text style={styles.subtitle}>
          Select from suggestions or add your own
        </Text>

        {/* Counter */}
        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>
            {selectedAffirmations.length} of 15 selected
          </Text>
        </View>

        {/* Selected Affirmations */}
        {selectedAffirmations.length > 0 && (
          <View style={styles.selectedContainer}>
            <Text style={styles.sectionTitle}>Selected Affirmations</Text>
            {selectedAffirmations.map((affirmation, index) => (
              <View key={index} style={styles.selectedAffirmation}>
                <Text style={styles.selectedAffirmationText}>{affirmation}</Text>
                <TouchableOpacity
                  onPress={() => removeAffirmation(affirmation)}
                  style={styles.removeButton}
                >
                  <Ionicons name="close-circle" size={20} color="#FF6B6B" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Suggested Affirmations */}
        <View style={styles.suggestionsContainer}>
          <Text style={styles.sectionTitle}>Suggested for {sessionData.category}</Text>
          {suggestedAffirmations.map((affirmation, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.affirmationCard,
                selectedAffirmations.includes(affirmation) && styles.selectedCard
              ]}
              onPress={() => toggleAffirmation(affirmation)}
              disabled={selectedAffirmations.length >= 15 && !selectedAffirmations.includes(affirmation)}
            >
              <Text style={[
                styles.affirmationText,
                selectedAffirmations.includes(affirmation) && styles.selectedAffirmationText
              ]}>
                {affirmation}
              </Text>
              {selectedAffirmations.includes(affirmation) && (
                <Ionicons name="checkmark-circle" size={24} color="#6666FF" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Add Custom Affirmation */}
        {!showCustomInput ? (
          <TouchableOpacity
            style={styles.addCustomButton}
            onPress={() => setShowCustomInput(true)}
            disabled={selectedAffirmations.length >= 15}
          >
            <Ionicons name="add-circle-outline" size={24} color="#6666FF" />
            <Text style={styles.addCustomText}>Add your own affirmation</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.customInputContainer}>
            <TextInput
              style={styles.customInput}
              placeholder="Type your custom affirmation..."
              value={customAffirmation}
              onChangeText={setCustomAffirmation}
              multiline
              placeholderTextColor="#A3A3CC"
            />
            <View style={styles.customInputButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setShowCustomInput(false);
                  setCustomAffirmation('');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.addButton, !customAffirmation.trim() && styles.disabledButton]}
                onPress={addCustomAffirmation}
                disabled={!customAffirmation.trim()}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
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
          style={[styles.nextButton, selectedAffirmations.length === 0 && styles.disabledButton]}
          onPress={handleNext}
          disabled={selectedAffirmations.length === 0}
        >
          <LinearGradient
            colors={selectedAffirmations.length === 0 ? ['#A3A3CC', '#CCCCFF'] : ['#6666FF', '#9999FF']}
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
    marginBottom: 20,
    lineHeight: 22,
  },
  counterContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  counterText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6666FF',
  },
  selectedContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#292966',
    marginBottom: 16,
  },
  selectedAffirmation: {
    backgroundColor: 'rgba(102, 102, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedAffirmationText: {
    fontSize: 14,
    color: '#292966',
    flex: 1,
    marginRight: 8,
  },
  removeButton: {
    padding: 4,
  },
  suggestionsContainer: {
    marginBottom: 24,
  },
  affirmationCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'rgba(204, 204, 255, 0.3)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedCard: {
    backgroundColor: 'rgba(102, 102, 255, 0.1)',
    borderColor: '#6666FF',
  },
  affirmationText: {
    fontSize: 14,
    color: '#292966',
    flex: 1,
    marginRight: 8,
  },
  selectedAffirmationText: {
    color: '#292966',
    fontWeight: '500',
  },
  addCustomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'rgba(204, 204, 255, 0.3)',
    borderStyle: 'dashed',
  },
  addCustomText: {
    fontSize: 16,
    color: '#6666FF',
    marginLeft: 8,
    fontWeight: '500',
  },
  customInputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  customInput: {
    fontSize: 14,
    color: '#292966',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  customInputButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#5C5C99',
  },
  addButton: {
    backgroundColor: '#6666FF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  disabledButton: {
    opacity: 0.6,
  },
  addButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
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

export default SuggestedAffirmationsScreen;
