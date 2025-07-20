import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { db } from '../services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const AddResidentScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [identification, setIdentification] = useState('');
  const [telNumber, setTelNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateTel = (tel: string) => {
    // Accepts numbers, spaces, dashes, parentheses, plus sign
    const re = /^[\d\s\-()+]+$/;
    return re.test(tel);
  };

  const handleSave = async () => {
    if (!name.trim() || !identification.trim() || !telNumber.trim()) {
      Alert.alert('Validation Error', 'Name, Identification, and Tel Number are required.');
      return;
    }
    if (!validateTel(telNumber)) {
      Alert.alert('Validation Error', 'Tel Number contains invalid characters.');
      return;
    }
    if (emailAddress && !validateEmail(emailAddress)) {
      Alert.alert('Validation Error', 'Email address is not valid.');
      return;
    }

    try {
      await addDoc(collection(db, 'ResidentsCollection'), {
        name: name.trim(),
        identificacion: identification.trim(),
        telNumber: telNumber.trim(),
        emailAddress: emailAddress.trim() || null,
      });
      Alert.alert('Success', 'Resident added successfully.');
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Resident</Text>
      <TextInput
        style={styles.input}
        placeholder="Name*"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Identification*"
        value={identification}
        onChangeText={setIdentification}
      />
      <TextInput
        style={styles.input}
        placeholder="Tel Number*"
        value={telNumber}
        onChangeText={setTelNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address (optional)"
        value={emailAddress}
        onChangeText={setEmailAddress}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button title="Save" onPress={handleSave} />
      <Text style={styles.note}>* Required fields</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  note: { marginTop: 12, color: '#888', textAlign: 'center' },
  text: { fontSize: 18 },
});

export default AddResidentScreen;