import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const CreateButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={['#E49B7B', '#E4D96F']} // Coral to straw gradient for strong contrast
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.plusIcon}>+</Text>
        <Text style={styles.createText}>Create</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  gradient: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
  },
  plusIcon: {
    fontSize: 28,
    fontWeight: '300',
    color: '#FFFFFF', // White for strong contrast on coral-straw gradient
    marginRight: 8,
  },
  createText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF', // White for strong contrast
  },
});

export default CreateButton;
