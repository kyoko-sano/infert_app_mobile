import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen';
import RecordScreen from './src/screens/RecordScreen';
import CommunityScreen from './src/screens/CommunityScreen';
import InfoScreen from './src/screens/InfoScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Record') {
              iconName = focused ? 'analytics' : 'analytics-outline';
            } else if (route.name === 'Community') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'Info') {
              iconName = focused ? 'library' : 'library-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#6366f1',
          tabBarInactiveTintColor: '#9ca3af',
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopColor: '#e5e7eb',
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
          headerStyle: {
            backgroundColor: '#ffffff',
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTitleStyle: {
            fontWeight: '600',
            color: '#374151',
          },
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'ホーム' }}
        />
        <Tab.Screen 
          name="Record" 
          component={RecordScreen} 
          options={{ title: '記録' }}
        />
        <Tab.Screen 
          name="Community" 
          component={CommunityScreen} 
          options={{ title: 'コミュニティ' }}
        />
        <Tab.Screen 
          name="Info" 
          component={InfoScreen} 
          options={{ title: '情報' }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ title: 'プロフィール' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}