import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Calendar from '../components/Calendar';
import AppointmentCard from '../components/AppointmentCard';
import AddAppointmentModal from '../components/AddAppointmentModal';
import { getAppointmentsByDate } from '../services/appointments';
import { GREEN_2, GREEN_3, GRAY_1 } from '../styles/Colors';

function toDateString(date) {
    if (!date) return null;
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

export default function PresencialCalendar() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [appointmentsByDate, setAppointmentsByDate] = useState({});

    const dateKey = toDateString(selectedDate);

    const appointments = dateKey
        ? (appointmentsByDate[dateKey] ?? getAppointmentsByDate(dateKey))
        : [];

    function handleSave({ time, title }) {
        const current = appointmentsByDate[dateKey] ?? getAppointmentsByDate(dateKey);
        const newItem = { id: String(Date.now()), time, title };
        setAppointmentsByDate(prev => ({
            ...prev,
            [dateKey]: [...current, newItem].sort((a, b) => a.time.localeCompare(b.time)),
        }));
        setModalVisible(false);
    }

    return (
        <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
            <Text style={styles.title}>Consultas Presenciais</Text>

            <Calendar
                onDayPress={setSelectedDate}
                selectedDate={selectedDate}
            />

            {selectedDate ? (
                <>
                    <Text style={styles.sectionLabel}>
                        {selectedDate.toLocaleDateString('pt-BR', {
                            weekday: 'long', day: '2-digit', month: 'long',
                        })}
                    </Text>

                    <FlatList
                        data={appointments}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <AppointmentCard time={item.time} title={item.title} />
                        )}
                        contentContainerStyle={styles.list}
                        showsVerticalScrollIndicator={false}
                    />
                </>
            ) : null}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 20,
        paddingTop: 8,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: GREEN_3,
        marginBottom: 16,
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: GRAY_1,
        textTransform: 'capitalize',
        marginTop: 20,
        marginBottom: 10,
    },
    list: {
        paddingBottom: 90,
    },
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: GREEN_2,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
    },
});
