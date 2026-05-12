import React from 'react';
import { Modal, View, ActivityIndicator, StyleSheet } from 'react-native';
import CustomText from './CustomText';
import { GREEN_1, GREEN_2 } from '../src/styles/Colors';

export default function LoadingModal({ visible, message = 'Aguarde...' }) {
    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
            onRequestClose={() => {}}
        >
            <View style={styles.overlay}>
                <View style={styles.box}>
                    <ActivityIndicator size="large" color={GREEN_2} />
                    <CustomText variant="bodyMedium" style={styles.message}>
                        {message}
                    </CustomText>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 32,
        alignItems: 'center',
        gap: 16,
    },
    message: {
        color: GREEN_1,
        textAlign: 'center',
    },
});
