import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ResidentsScreen from '../screens/ResidentsScreen';
import ResidencesScreen from '../screens/ResidencesScreen';
import PaymentScreen from '../screens/PaymentScreen';
import NewsScreen from '../screens/NewsScreen';
import MyInformationScreen from '../screens/MyInformationScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { Ionicons } from '@expo/vector-icons'; 
import ResidentsStackNavigator from './ResidentsStackNavigator';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, 
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Residents') {
            iconName = 'people-outline';
          } else if (route.name === 'Residences') {
            iconName = 'home-outline';
          } else if (route.name === 'Payments') {
            iconName = 'card-outline';
          } else if (route.name === 'News') {
            iconName = 'newspaper-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Residents" component={ResidentsStackNavigator} />
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