import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Tab, Navigator } from 'react-native';
import HomeScreen from './HomeScreen';
import Profile from './profile';
import { Ionicons } from '@expo/vector-icons';
import { GRAY_1, GREEN_1, GREEN_2, GREEN_3, GREEN_4 } from '../styles/Colors';

export default function TabNavigator({ navigation }) {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator initialRouteName='Home'>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home" size={size} color={GREEN_2} />
                ),
                tabBarActiveTintColor: GREEN_3,
                tabBarInactiveTintColor: GRAY_1,
            }} />
            <Tab.Screen name="Agenda" component={HomeScreen} options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="calendar" size={size} color={GREEN_2} />
                ),
                tabBarActiveTintColor: GREEN_3,
                tabBarInactiveTintColor: GRAY_1,
            }} />
            <Tab.Screen name="Progresso" component={HomeScreen} options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="bar-chart" size={size} color={GREEN_2} />
                ),
                tabBarActiveTintColor: GREEN_3,
                tabBarInactiveTintColor: GRAY_1,
            }} />
            <Tab.Screen name="Perfil" component={Profile} options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="person" size={size} color={GREEN_2} />
                ),
                tabBarActiveTintColor: GREEN_3,
                tabBarInactiveTintColor: GRAY_1,
            }} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    icontab: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
});