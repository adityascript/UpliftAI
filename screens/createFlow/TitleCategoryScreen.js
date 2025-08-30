import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const TitleCategoryScreen = ({ sessionData, updateSessionData, nextStep }) => {
  const [title, setTitle] = useState(sessionData.title);
  const [selectedCategory, setSelectedCategory] = useState(sessionData.category);
  const [titleError, setTitleError] = useState('');

  const categories = [
    'Love & Relationships',
    'Career & Success', 
    'Full Potential',
    'Inner Peace',
    'Well-being',
    'Other'
  ];

  const handleNext = () => {
    if (!title.trim()) {
      setTitleError('Please enter a title for your session');
      return;
    }
    if (!selectedCategory) {
      setTitleError('Please select a category');
      return;
    }

    updateSessionData('title', title.trim());
    updateSessionData('category', selectedCategory);
    nextStep();
  };

  const handleTitleChange = (text) => {
    setTitle(text);
    setTitleError('');
    if (text.length > 40) {
      setTitle(text.substring(0, 40));
    }
  };

  const isNextDisabled = !title.trim() || !selectedCategory;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>Title your session</Text>
        <Text style={styles.subtitle}>
          Give your affirmation session a meaningful name
        </Text>

        {/* Title Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.textInput, titleError && styles.inputError]}
            placeholder="Enter session title..."
            value={title}
            onChangeText={handleTitleChange}
            maxLength={40}
            placeholderTextColor="#A3A3CC"
          />
          <Text style={styles.charCount}>{title.length}/40</Text>
          {titleError ? <Text style={styles.errorText}>{titleError}</Text> : null}
        </View>

        {/* Category Selection */}
        <View style={styles.categoryContainer}>
          <Text style={styles.sectionTitle}>Choose a category</Text>
          <Text style={styles.sectionSubtitle}>
            Select the area of life you want to focus on
          </Text>
          
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  selectedCategory === category && styles.selectedChip
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Next Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.nextButton, isNextDisabled && styles.disabledButton]}
          onPress={handleNext}
          disabled={isNextDisabled}
        >
          <LinearGradient
            colors={isNextDisabled ? ['#A3A3CC', '#CCCCFF'] : ['#6666FF', '#9999FF']}
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
  inputContainer: {
    marginBottom: 32,
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#292966',
    borderWidth: 2,
    borderColor: 'rgba(204, 204, 255, 0.3)',
  },
  inputError: {
    borderColor: '#FF6B6B',
  },
  charCount: {
    textAlign: 'right',
    fontSize: 12,
    color: '#A3A3CC',
    marginTop: 4,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 14,
    marginTop: 4,
  },
  categoryContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#292966',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#5C5C99',
    marginBottom: 20,
    lineHeight: 20,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: 'rgba(204, 204, 255, 0.3)',
  },
  selectedChip: {
    backgroundColor: '#6666FF',
    borderColor: '#6666FF',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#5C5C99',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  buttonContainer: {
    paddingVertical: 20,
  },
  nextButton: {
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

export default TitleCategoryScreen;
