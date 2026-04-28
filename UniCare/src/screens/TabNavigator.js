import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Tab, Navigator } from 'react-native';
import HomeScreen from './HomeScreen';
import profile from './profile';




export default function TabNavigator({ navigation }) {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator initialRouteName='Home'>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                headerShown: false,
            }} />
            <Tab.Screen name="Agenda" component={HomeScreen} options={{
                headerShown: false,
            }} />
            <Tab.Screen name="Progresso" component={HomeScreen} options={{
                headerShown: false,
            }} />
            <Tab.Screen name="Perfil" component={profile} options={{
                headerShown: false,
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