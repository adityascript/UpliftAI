import React, { useState } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import ProgressIndicator from '../components/ProgressIndicator';
import TitleCategoryScreen from './createFlow/TitleCategoryScreen';
import SuggestedAffirmationsScreen from './createFlow/SuggestedAffirmationsScreen';
import SessionLengthScreen from './createFlow/SessionLengthScreen';
import VoiceStyleScreen from './createFlow/VoiceStyleScreen';
import BackgroundMusicScreen from './createFlow/BackgroundMusicScreen';
import LoopingRepeatsScreen from './createFlow/LoopingRepeatsScreen';
import ReviewSaveScreen from './createFlow/ReviewSaveScreen';

const { width } = Dimensions.get('window');

const CreateAffirmationFlow = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [slideAnim] = useState(new Animated.Value(0));
  
  // Session data state
  const [sessionData, setSessionData] = useState({
    title: '',
    category: '',
    affirmations: [],
    sessionLength: 10,
    persona: null,
    backgroundMusic: 'None',
    loopingMode: 'No repeat'
  });

  const totalSteps = 7;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      Animated.timing(slideAnim, {
        toValue: -(currentStep * width),
        duration: 300,
        useNativeDriver: true,
      }).start();
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      Animated.timing(slideAnim, {
        toValue: -((currentStep - 2) * width),
        duration: 300,
        useNativeDriver: true,
      }).start();
      setCurrentStep(currentStep - 1);
    }
  };

  const updateSessionData = (key, value) => {
    setSessionData(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveAndGenerate = () => {
    // Save session to My Creations
    // Generate audio playlist
    // Redirect to player screen
    navigation.navigate('Home');
  };

  const renderCurrentScreen = () => {
    const commonProps = {
      sessionData,
      updateSessionData,
      nextStep,
      prevStep,
      currentStep,
      totalSteps
    };

    switch (currentStep) {
      case 1:
        return <TitleCategoryScreen {...commonProps} />;
      case 2:
        return <SuggestedAffirmationsScreen {...commonProps} />;
      case 3:
        return <SessionLengthScreen {...commonProps} />;
      case 4:
        return <VoiceStyleScreen {...commonProps} />;
      case 5:
        return <BackgroundMusicScreen {...commonProps} />;
      case 6:
        return <LoopingRepeatsScreen {...commonProps} />;
      case 7:
        return <ReviewSaveScreen {...commonProps} onSave={handleSaveAndGenerate} />;
      default:
        return <TitleCategoryScreen {...commonProps} />;
    }
  };

  return (
    <LinearGradient
      colors={['#9999FF', '#CCCCFF']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        
        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
        </View>

        {/* Screen Content */}
        <View style={styles.screenContainer}>
          {renderCurrentScreen()}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  screenContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default CreateAffirmationFlow;
