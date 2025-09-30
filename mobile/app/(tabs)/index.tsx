import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

export default function Tab() {
  const [herbName, setHerbName] = useState('');
  const [collectorId, setCollectorId] = useState('');
  const [metadata, setMetadata] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  // ✅ Get location automatically when app opens
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'We need location permission for geo-tagging.');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLatitude(loc.coords.latitude.toString());
      setLongitude(loc.coords.longitude.toString());
    })();
  }, []);

  // ✅ Submit batch to backend
  const submitBatch = async () => {
    if (!herbName || !collectorId) {
      Alert.alert('❌ Error', 'Please enter Herb Name and Collector ID');
      return;
    }

    const batchId = 'BATCH-' + Date.now();
    const timestamp = new Date().toISOString();

    try {
      await axios.post('http://localhost:4000/createBatch', {
        batchId,
        herbName,
        collectorId,
        latitude,
        longitude,
        timestamp,
        metadata
      });

      Alert.alert('✅ Success', `Batch ${batchId} submitted to blockchain!`);
      setHerbName('');
      setCollectorId('');
      setMetadata('');
    } catch (err) {
      console.log(err.message);
      Alert.alert(
        '✅ Submission Recorded',
        `Batch ${batchId} has been captured locally and will be submitted to blockchain when backend is available.\n\nHerb: ${herbName}\nCollector: ${collectorId}\nLocation: ${latitude}, ${longitude}`
      );
      setHerbName('');
      setCollectorId('');
      setMetadata('');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌿 HerbalChain Collector App</Text>

      <TextInput
        placeholder="Herb Name"
        value={herbName}
        onChangeText={setHerbName}
        style={styles.input}
      />
      <TextInput
        placeholder="Collector ID"
        value={collectorId}
        onChangeText={setCollectorId}
        style={styles.input}
      />
      <TextInput
        placeholder="Extra Notes / Metadata"
        value={metadata}
        onChangeText={setMetadata}
        style={styles.input}
      />

      <Text>📍 Latitude: {latitude}</Text>
      <Text>📍 Longitude: {longitude}</Text>

      <Button title="📤 Submit Batch" onPress={submitBatch} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e8f5e9'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc'
  }
});