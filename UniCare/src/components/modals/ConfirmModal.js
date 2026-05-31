import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native';
import CustomText from '../CustomText';
import { GREEN_1, GREEN_2, GRAY_1, ERROR_BG, ERROR_TEXT } from '../../styles/Colors';

export default function ConfirmModal({
    visible,
    title,
    message,
    onConfirm,
    onCancel,
    confirmLabel = 'Confirmar',
    cancelLabel = 'Cancelar',
}) {
    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
            onRequestClose={onCancel}
        >
            <View style={styles.overlay}>
                <View style={styles.box}>
                    <View style={styles.iconRow}>
                        <CustomText style={styles.icon}>?</CustomText>
                    </View>

                    <CustomText variant="bodyLarge" style={styles.title}>
                        {title}
                    </CustomText>

                    {message && (
                        <CustomText variant="bodyMedium" style={styles.message}>
                            {message}
                        </CustomText>
                    )}

                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                            <CustomText variant="bodyLarge" style={styles.cancelText}>
                                {cancelLabel}
                            </CustomText>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
                            <CustomText variant="bodyLarge" style={styles.confirmText}>
                                {confirmLabel}
                            </CustomText>
                        </TouchableOpacity>
                    </View>
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
    buttons: {
        flexDirection: 'row',
        gap: 12,
    },
    cancelButton: {
        flex: 1,
        borderWidth: 1.5,
        borderColor: GRAY_1,
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: 'center',
    },
    cancelText: {
        color: GRAY_1,
        fontWeight: 'bold',
    },
    confirmButton: {
        flex: 1,
        backgroundColor: GREEN_2,
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: 'center',
    },
    confirmText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
