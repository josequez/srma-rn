import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ResidentsScreen from '../screens/ResidentsScreen';
import ResidencesScreen from '../screens/ResidencesScreen';
import PaymentScreen from '../screens/PaymentScreen';
import NewsScreen from '../screens/NewsScreen';
import MyInformationScreen from '../screens/MyInformationScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Residents" component={ResidentsScreen} />
      <Tab.Screen name="Residences" component={ResidencesScreen} />
      <Tab.Screen name="Payments" component={PaymentScreen} />
      <Tab.Screen name="News" component={NewsScreen} />
    </Tab.Navigator>
  );
}

const MainAppNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={BottomTabs} options={{ headerShown: false }} />
    <Drawer.Screen name="My Information" component={MyInformationScreen} />
    <Drawer.Screen name="Settings" component={SettingsScreen} />
    {/* Add a custom drawer item for Log Out in your custom drawer content if needed */}
  </Drawer.Navigator>
);

export default MainAppNavigator;