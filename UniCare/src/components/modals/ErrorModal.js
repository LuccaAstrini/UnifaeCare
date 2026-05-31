import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native';
import CustomText from '../CustomText';
import { GREEN_1, GREEN_2, GRAY_1, ERROR_BG, ERROR_TEXT } from '../../styles/Colors';

export default function ErrorModal({ visible, message, onClose }) {
    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.box}>
                    <View style={styles.iconRow}>
                        <CustomText style={styles.icon}>!</CustomText>
                    </View>

                    <CustomText variant="bodyLarge" style={styles.title}>
                        Algo deu errado
                    </CustomText>

                    <CustomText variant="bodyMedium" style={styles.message}>
                        {message}
                    </CustomText>

                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <CustomText variant="bodyLarge" style={styles.buttonText}>
                            Fechar
                        </CustomText>
                    </TouchableOpacity>
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
        padding: 24,
        width: '80%',
        alignItems: 'center',
    },
    iconRow: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: ERROR_BG,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    icon: {
        fontSize: 26,
        fontWeight: 'bold',
        color: ERROR_TEXT,
    },
    title: {
        color: GREEN_1,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    message: {
        color: GRAY_1,
        textAlign: 'center',
        marginBottom: 24,
    },
    button: {
        backgroundColor: GREEN_2,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 32,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
