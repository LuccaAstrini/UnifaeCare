// components/ui/AlertBanner.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    FONT_FAMILY_BOLD,
    FONT_FAMILY_REGULAR,
    FONT_SIZE_SMALL,
    FONT_SIZE_MEDIUM,
} from '../src/styles/Typography';
import { GREEN_1, GREEN_4 } from '../src/styles/Colors';
import CustomText from './CustomText';

const AlertBanner = ({ title = 'Aviso!', message }) => {
    return (
        <View style={styles.container}>
            <View style={styles.accent} />

            <View style={styles.card}>
                <View style={styles.content}>
                    <CustomText variant="label" style={{ fontWeight: 'bold' }} >{title}</CustomText>
                    <CustomText variant="bodyMedium" >{message}</CustomText>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 16
    },
    accent: {
        position: 'absolute',
        top: 0,
        left: -4,      // peeks out left
        bottom: 0,
        width: '100%',
        backgroundColor: GREEN_1,
        borderRadius: 12,
    },
    card: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        marginLeft: 5,
        elevation: 3,
    },
    content: {
        flex: 1,
        paddingHorizontal: 45,
        paddingVertical: 14,
        gap: 6,
    }
});

export default AlertBanner;