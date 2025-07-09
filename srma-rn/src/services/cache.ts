import AsyncStorage from '@react-native-async-storage/async-storage';

export const setCache = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // handle error
    console.error('Error setting cache:', e);
  }
};

export const getCache = async <T = any>(key: string): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (e) {
    // handle error
    console.error('Error getting cache:', e);
    return null;
  }
};

export const removeCache = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // handle error
    console.error('Error removing cache:', e);
  }
};