import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const ReviewSaveScreen = ({ sessionData, prevStep, onSave }) => {
  const handleSaveAndGenerate = () => {
    onSave();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>Review & Save</Text>
        <Text style={styles.subtitle}>
          Review your affirmation session before generating
        </Text>

        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.9)']}
            style={styles.summaryGradient}
          >
            <View style={styles.summaryHeader}>
              <Text style={styles.summaryTitle}>{sessionData.title}</Text>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{sessionData.category}</Text>
              </View>
            </View>

            <View style={styles.summaryDetails}>
              <View style={styles.detailRow}>
                <Ionicons name="list-outline" size={20} color="#6666FF" />
                <Text style={styles.detailLabel}>Affirmations:</Text>
                <Text style={styles.detailValue}>{sessionData.affirmations?.length || 0} selected</Text>
              </View>

              <View style={styles.detailRow}>
                <Ionicons name="time-outline" size={20} color="#6666FF" />
                <Text style={styles.detailLabel}>Duration:</Text>
                <Text style={styles.detailValue}>{sessionData.sessionLength} minutes</Text>
              </View>

              <View style={styles.detailRow}>
                <Ionicons name="person-outline" size={20} color="#6666FF" />
                <Text style={styles.detailLabel}>Voice:</Text>
                <Text style={styles.detailValue}>{sessionData.persona?.name || 'Not selected'}</Text>
              </View>

              <View style={styles.detailRow}>
                <Ionicons name="musical-notes-outline" size={20} color="#6666FF" />
                <Text style={styles.detailLabel}>Background:</Text>
                <Text style={styles.detailValue}>{sessionData.backgroundMusic?.name || 'Not selected'}</Text>
              </View>

              <View style={styles.detailRow}>
                <Ionicons name="repeat-outline" size={20} color="#6666FF" />
                <Text style={styles.detailLabel}>Looping:</Text>
                <Text style={styles.detailValue}>{sessionData.loopingMode?.name || 'Not selected'}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Affirmations Preview */}
        {sessionData.affirmations && sessionData.affirmations.length > 0 && (
          <View style={styles.affirmationsContainer}>
            <Text style={styles.sectionTitle}>Your Affirmations</Text>
            <View style={styles.affirmationsList}>
              {sessionData.affirmations.slice(0, 3).map((affirmation, index) => (
                <View key={index} style={styles.affirmationItem}>
                  <Text style={styles.affirmationNumber}>{index + 1}</Text>
                  <Text style={styles.affirmationText}>{affirmation}</Text>
                </View>
              ))}
              {sessionData.affirmations.length > 3 && (
                <View style={styles.moreAffirmations}>
                  <Text style={styles.moreText}>
                    +{sessionData.affirmations.length - 3} more affirmations
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Session Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Session Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{sessionData.affirmations?.length || 0}</Text>
              <Text style={styles.statLabel}>Affirmations</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{sessionData.sessionLength}</Text>
              <Text style={styles.statLabel}>Minutes</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {sessionData.loopingMode?.id === 'no-repeat' 
                  ? sessionData.affirmations?.length || 0
                  : sessionData.loopingMode?.id === 'repeat-1x'
                  ? (sessionData.affirmations?.length || 0) * 2
                  : sessionData.loopingMode?.id === 'repeat-2x'
                  ? (sessionData.affirmations?.length || 0) * 3
                  : sessionData.loopingMode?.id === 'repeat-3x'
                  ? (sessionData.affirmations?.length || 0) * 4
                  : '∞'
                }
              </Text>
              <Text style={styles.statLabel}>Total Plays</Text>
            </View>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Ready to Generate</Text>
          <Text style={styles.infoText}>
            Your affirmation session will be created with AI-generated voice and background music. This may take a few moments.
          </Text>
        </View>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={prevStep}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveAndGenerate}>
          <LinearGradient
            colors={['#6666FF', '#9999FF']}
            style={styles.buttonGradient}
          >
            <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" style={styles.saveIcon} />
            <Text style={styles.buttonText}>Save & Generate</Text>
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
  summaryCard: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  summaryGradient: {
    padding: 24,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#292966',
    flex: 1,
    marginRight: 12,
  },
  categoryBadge: {
    backgroundColor: '#6666FF',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  summaryDetails: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 16,
    color: '#5C5C99',
    marginLeft: 8,
    marginRight: 12,
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#292966',
  },
  affirmationsContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#292966',
    marginBottom: 16,
  },
  affirmationsList: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 16,
  },
  affirmationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  affirmationNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6666FF',
    marginRight: 12,
    marginTop: 2,
  },
  affirmationText: {
    fontSize: 14,
    color: '#292966',
    flex: 1,
    lineHeight: 20,
  },
  moreAffirmations: {
    alignItems: 'center',
    paddingTop: 8,
  },
  moreText: {
    fontSize: 14,
    color: '#6666FF',
    fontWeight: '500',
  },
  statsContainer: {
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#6666FF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#5C5C99',
    fontWeight: '500',
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
  saveButton: {
    flex: 1,
    marginLeft: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  saveIcon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default ReviewSaveScreen;
