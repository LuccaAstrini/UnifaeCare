import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React, { useState } from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native';
import HomeScreen from './HomeScreen';
import Profile from './profile';
import OnlineCalendar from './OnlineCalendar';
import { Ionicons } from '@expo/vector-icons';
import { GRAY_1, GREEN_2, GREEN_3 } from '../styles/Colors';
import { useAuth } from '../context/AuthContext';

function CustomDrawerContent(props) {
    const currentRoute = props.state.routeNames[props.state.index];
    const { signOut } = useAuth();

    const itemProps = {
        activeTintColor: GREEN_3,
        inactiveTintColor: GRAY_1,
    };

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItem
                label="Home"
                icon={({ size }) => <Ionicons name="home" size={size} color={GREEN_2} />}
                focused={currentRoute === 'Home'}
                onPress={() => props.navigation.navigate('Home')}
                {...itemProps}
            />

            <DrawerItem
                label="Consultas"
                icon={({ size }) => <Ionicons name="calendar" size={size} color={GREEN_2} />}
                focused={currentRoute === 'ConsultasOnline'}
                onPress={() => props.navigation.navigate('ConsultasOnline')}
                labelStyle={styles.subLabel}
                {...itemProps}
            />

            <DrawerItem
                label="Progresso"
                icon={({ size }) => <Ionicons name="bar-chart" size={size} color={GREEN_2} />}
                focused={currentRoute === 'Progresso'}
                onPress={() => props.navigation.navigate('Progresso')}
                {...itemProps}
            />
            <DrawerItem
                label="Perfil"
                icon={({ size }) => <Ionicons name="person" size={size} color={GREEN_2} />}
                focused={currentRoute === 'Perfil'}
                onPress={() => props.navigation.navigate('Perfil')}
                {...itemProps}
            />
            <DrawerItem
                label="Sair"
                icon={({ size }) => <Ionicons name="log-out" size={size} color={"black"} />}
                focused={currentRoute === 'Sair'}
                onPress={async () => { await signOut(); props.navigation.navigate('LoginView'); }}
                style={{ marginTop: 20, backgroundColor: 'rgba(255, 0, 0, 0.1)' }}
                labelStyle={{ color: 'black' }}
            />
        </DrawerContentScrollView>
    );
}

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({ navigation }) {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={({ navigation }) => ({
                drawerActiveTintColor: GREEN_3,
                drawerInactiveTintColor: GRAY_1,
                headerShown: true,
                headerTitle: '',
                headerShadowVisible: false,
                headerStyle: { backgroundColor: 'transparent', elevation: 0 },
                headerLeft: () => (
                    <Pressable
                        onPress={() => navigation.openDrawer()}
                        style={styles.menuButton}
                        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                    >
                        <Ionicons name="menu" size={28} color={GREEN_2} />
                    </Pressable>
                ),
            })}
        >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="ConsultasOnline" component={OnlineCalendar} />
            <Drawer.Screen name="Historico" component={HomeScreen} />
            <Drawer.Screen name="Progresso" component={HomeScreen} />
            <Drawer.Screen name="Perfil" component={Profile} />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    menuButton: {
        paddingHorizontal: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    sectionHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionIcon: {
        marginRight: 32,
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: '500',
    },
    subItems: {
        paddingLeft: 16,
    },
    subLabel: {
        fontSize: 13,
    },
});
