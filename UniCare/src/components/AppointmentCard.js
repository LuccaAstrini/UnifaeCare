import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GREEN_2, GREEN_4, GRAY_1 } from '../styles/Colors';

export default function AppointmentCard({ time, title, category }) {
    return (
        <View style={styles.card}>
            <View style={styles.timeBadge}>
                <Text style={styles.timeText}>{time}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 14,
        marginBottom: 10,
        elevation: 1,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 1 },
    },
    timeBadge: {
        backgroundColor: GREEN_4,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginRight: 14,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 58,
    },
    timeText: {
        color: GREEN_2,
        fontWeight: '700',
        fontSize: 14,
    },
    info: {
        flex: 1,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#222',
        marginBottom: 2,
    },
    category: {
        fontSize: 12,
        color: GRAY_1,
    },
});
