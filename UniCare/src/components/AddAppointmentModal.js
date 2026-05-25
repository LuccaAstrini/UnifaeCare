import React, { useState } from 'react';
import {
    Modal, View, Text, TextInput,
    TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { GREEN_2, GREEN_3, GREEN_4, GRAY_1 } from '../styles/Colors';

function formatTime(date) {
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    return `${h}:${m}`;
}

export default function AddAppointmentModal({ visible, onSave, onClose }) {
    const [time, setTime] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [title, setTitle] = useState('');

    function handleTimeChange(event, selected) {
        setShowPicker(Platform.OS === 'ios');
        if (selected) setTime(selected);
    }

    function handleSave() {
        if (!title.trim()) return;
        onSave({ time: formatTime(time), title: title.trim() });
        setTitle('');
        setTime(new Date());
    }

    function handleClose() {
        setTitle('');
        setTime(new Date());
        setShowPicker(false);
        onClose();
    }

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
            <KeyboardAvoidingView
                style={styles.overlay}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <View style={styles.sheet}>
                    <Text style={styles.heading}>Nova Consulta</Text>

                    <Text style={styles.label}>Horário</Text>
                    <TouchableOpacity style={styles.timeButton} onPress={() => setShowPicker(true)}>
                        <Ionicons name="time-outline" size={18} color={GREEN_2} />
                        <Text style={styles.timeText}>{formatTime(time)}</Text>
                    </TouchableOpacity>

                    {showPicker && (
                        <DateTimePicker
                            value={time}
                            mode="time"
                            is24Hour
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={handleTimeChange}
                        />
                    )}

                    <Text style={styles.label}>Descrição</Text>
                    <TextInput
                        style={[styles.input, styles.inputMultiline]}
                        placeholder="Ex: Consulta com Dr. Silva"
                        placeholderTextColor={GRAY_1}
                        value={title}
                        onChangeText={setTitle}
                        multiline
                    />

                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.cancelBtn} onPress={handleClose}>
                            <Text style={styles.cancelText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.saveBtn, !title.trim() && styles.saveBtnDisabled]}
                            onPress={handleSave}
                            disabled={!title.trim()}
                        >
                            <Text style={styles.saveText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    sheet: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
    },
    heading: {
        fontSize: 18,
        fontWeight: '700',
        color: GREEN_3,
        marginBottom: 20,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        color: GRAY_1,
        marginBottom: 6,
    },
    timeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        borderWidth: 1,
        borderColor: GREEN_2,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 16,
    },
    timeText: {
        fontSize: 15,
        fontWeight: '600',
        color: GREEN_2,
    },
    input: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 14,
        color: '#222',
        marginBottom: 16,
    },
    inputMultiline: {
        height: 80,
        textAlignVertical: 'top',
    },
    actions: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 4,
    },
    cancelBtn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: GREEN_2,
        alignItems: 'center',
    },
    cancelText: {
        color: GREEN_2,
        fontWeight: '600',
        fontSize: 14,
    },
    saveBtn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        backgroundColor: GREEN_2,
        alignItems: 'center',
    },
    saveBtnDisabled: {
        backgroundColor: GREEN_4,
    },
    saveText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 14,
    },
});
