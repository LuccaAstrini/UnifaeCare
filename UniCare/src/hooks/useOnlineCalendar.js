import { useState } from 'react';
import { getAppointmentsByDate } from '../services/appointments';

function toDateString(date) {
    if (!date) return null;
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

export function useOnlineCalendar() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [appointmentsByDate, setAppointmentsByDate] = useState({});

    const dateKey = toDateString(selectedDate);
    const appointments = dateKey
        ? (appointmentsByDate[dateKey] ?? getAppointmentsByDate(dateKey))
        : [];

    function handleDayPress(date) {
        setSelectedDate(date);
        if (date) {
            const key = toDateString(date);
            if (!appointmentsByDate[key]) {
                setAppointmentsByDate(prev => ({ ...prev, [key]: getAppointmentsByDate(key) }));
            }
        }
    }

    return { selectedDate, appointments, handleDayPress };
}
