import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import HomeScreen from './HomeScreen';
import Profile from './profile';
import OnlineCalendar from './OnlineCalendar';
import PresencialCalendar from './PresencialCalendar';
import { Ionicons } from '@expo/vector-icons';
import { GRAY_1, GREEN_2, GREEN_3 } from '../styles/Colors';

function CustomDrawerContent(props) {
    const [agendaOpen, setAgendaOpen] = useState(false);
    const currentRoute = props.state.routeNames[props.state.index];

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

            <TouchableOpacity onPress={() => setAgendaOpen(prev => !prev)} style={styles.sectionHeader}>
                <View style={styles.sectionHeaderLeft}>
                    <Ionicons name="calendar" size={20} color={GREEN_2} style={styles.sectionIcon} />
                    <Text style={[styles.sectionLabel, { color: GRAY_1 }]}>Agenda</Text>
                </View>
                <Ionicons name={agendaOpen ? 'chevron-up' : 'chevron-down'} size={16} color={GRAY_1} />
            </TouchableOpacity>

            {agendaOpen && (
                <View style={styles.subItems}>
                    <DrawerItem
                        label="Consultas presenciais"
                        focused={currentRoute === 'ConsultasPresenciais'}
                        onPress={() => props.navigation.navigate('ConsultasPresenciais')}
                        labelStyle={styles.subLabel}
                        {...itemProps}
                    />
                    <DrawerItem
                        label="Consultas On-line"
                        focused={currentRoute === 'ConsultasOnline'}
                        onPress={() => props.navigation.navigate('ConsultasOnline')}
                        labelStyle={styles.subLabel}
                        {...itemProps}
                    />
                    <DrawerItem
                        label="Histórico"
                        focused={currentRoute === 'Historico'}
                        onPress={() => props.navigation.navigate('Historico')}
                        labelStyle={styles.subLabel}
                        {...itemProps}
                    />
                </View>
            )}

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
        </DrawerContentScrollView>
    );
}

export default function DrawerNavigator({ navigation }) {

    const Drawer = createDrawerNavigator();

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
                    <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
                        <Ionicons name="menu" size={28} color={GREEN_2} />
                    </TouchableOpacity>
                ),
            })}
        >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="ConsultasPresenciais" component={PresencialCalendar} />
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
