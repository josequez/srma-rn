import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useNavigation } from '@react-navigation/native';

type Resident = {
  id: string;
  name: string;
  telNumber: string;
  identification: string;
  [key: string]: any;
};

const ResidentsScreen = () => {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  // Simple in-memory cache for demonstration
  const cacheKey = 'ResidentsCollectionCache';

  const fetchResidents = async () => {
    console.log('Fetching residents from Firestore...');
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'ResidentsCollection'));
      const data: Resident[] = [];
      querySnapshot.forEach((docSnap) => {
        const resident = docSnap.data();
        data.push({
          id: docSnap.id,
          name: resident.name,
          telNumber: resident.telNumber,
          identification: resident.identification,
          ...resident,
        });
      });
      setResidents(data);
      // Cache data in memory (could use AsyncStorage for persistence)
      (global as any)[cacheKey] = data;
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Try to load from cache first
    const cached = (global as any)[cacheKey];
    if (cached) {
      setResidents(cached);
      setLoading(false);
    } else {
      fetchResidents();
    }
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchResidents();
    setRefreshing(false);
  }, []);

  const handleDelete = async (id: string) => {
    Alert.alert('Delete Resident', 'Are you sure you want to delete this resident?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteDoc(doc(db, 'ResidentsCollection', id));
            setResidents((prev) => prev.filter((r) => r.id !== id));
            // Update cache
            (global as any)[cacheKey] = residents.filter((r) => r.id !== id);
          } catch (error: any) {
            Alert.alert('Error', error.message);
          }
        },
      },
    ]);
  };

  const renderResident = ({ item }: { item: Resident }) => (
    <View style={styles.item}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.info}>Tel: {item.telNumber}</Text>
        <Text style={styles.info}>ID: {item.identification}</Text>
      </View>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() =>
          Alert.alert(
            'Actions',
            '',
            [
              { text: 'View', onPress: () => Alert.alert('Resident Info', JSON.stringify(item, null, 2)) },
              { text: 'Edit', onPress: () => Alert.alert('Edit', 'Edit functionality goes here.') },
              { text: 'Delete', style: 'destructive', onPress: () => handleDelete(item.id) },
              { text: 'Cancel', style: 'cancel' },
            ],
            { cancelable: true }
          )
        }
      >
        <Text style={styles.menuText}>⋮</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={residents}
        keyExtractor={(item) => item.id}
        renderItem={renderResident}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          !loading ? <Text style={styles.empty}>No residents found.</Text> : null
        }
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddResident')}
      >
        <Text style={styles.fabIcon}>＋</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 8 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    marginVertical: 6,
    padding: 16,
    borderRadius: 8,
  },
  name: { fontSize: 18, fontWeight: 'bold' },
  info: { fontSize: 14, color: '#555' },
  menuButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
  },
  menuText: { fontSize: 22, fontWeight: 'bold' },
  empty: { textAlign: 'center', marginTop: 32, color: '#888' },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    backgroundColor: '#007AFF',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  fabIcon: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default ResidentsScreen;