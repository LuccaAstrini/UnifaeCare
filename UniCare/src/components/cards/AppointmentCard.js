import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GREEN_2, GREEN_4, GREEN_5, GRAY_1, GREEN_3, GREEN_1, ORAGEN_1, WHITE } from '../../styles/Colors';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../CustomText';

export default function AppointmentCard({ time, title, category }) {
    const color = category === 'videocam' ? GREEN_4 : ORAGEN_1;
    const iconColor = category === 'videocam' ? GREEN_2 : WHITE
    return (
        <View style={styles.card}>
            <View style={[styles.timeBadge, { backgroundColor: color }]}>
                <CustomText variant='label' color={iconColor} style={{ marginRight: 8 }} >{time}</CustomText>
                <Ionicons size={18} name={category} color={iconColor} />
            </View>
            <View style={styles.info}>
                <CustomText variant='bodyMedium'>{title}</CustomText>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
