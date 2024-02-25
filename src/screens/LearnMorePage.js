import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LearnMorePage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Unlock the Power of iPour Plus</Text>
      <Text style={styles.description}>
        Elevate your brewing experience with iPour Plus, our premium upgrade for the iPour Mobile App. With iPour Plus, you gain access to exclusive features that allow you to take full control over your beverage customization.
      </Text>
      <Text style={styles.feature}>Key Features:</Text>
      <Text style={styles.featureDescription}>
        - Precision Temperature Control: Set the exact temperature of your water to match the requirements of your favorite beverages.
      </Text>
      <Text style={styles.featureDescription}>
        - Beverage Profiles: Create and save personalized profiles for different types of beverages, ensuring every cup is brewed to perfection.
      </Text>
      <Text style={styles.featureDescription}>
        - Advanced Brewing Techniques: Explore advanced brewing techniques and experiment with different brewing methods to discover your perfect brew.
      </Text>
      <Text style={styles.featureDescription}>
        - Ad-Free Experience: Enjoy an uninterrupted brewing experience with no ads to distract you from your beverage journey.
      </Text>
      <Text style={styles.cta}>Ready to unlock a world of possibilities? Upgrade to iPour Plus now!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  feature: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  featureDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  cta: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'blue', // Change color to match your app's theme
  },
});

export default LearnMorePage;
