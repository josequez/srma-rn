import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ResidentsScreen from '../screens/ResidentsScreen';
import AddResidentScreen from '../screens/AddResidentScreen';

const Stack = createStackNavigator();

const ResidentsStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="ResidentsList" component={ResidentsScreen} options={{ title: 'Residents' }} />
    <Stack.Screen name="AddResident" component={AddResidentScreen} options={{ title: 'Add Resident' }} />
  </Stack.Navigator>
);

export default ResidentsStackNavigator;
