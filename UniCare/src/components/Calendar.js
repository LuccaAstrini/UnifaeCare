import React from 'react';
import { Calendar as RNCalendar, LocaleConfig } from 'react-native-calendars';
import { GREEN_2, GREEN_3, GREEN_4, GRAY_1 } from '../styles/Colors';

LocaleConfig.locales['pt-br'] = {
    monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
    dayNames: ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'],
    dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
    today: 'Hoje',
};
LocaleConfig.defaultLocale = 'pt-br';

function toDateString(date) {
    if (!date) return null;
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

export default function Calendar({ initialDate, selectedDate, onDayPress, markedDates = [] }) {
    const marked = {};

    markedDates.forEach(d => {
        const key = toDateString(d);
        if (key) marked[key] = { marked: true, dotColor: GREEN_2 };
    });

    const selectedKey = toDateString(selectedDate);
    if (selectedKey) {
        marked[selectedKey] = {
            ...marked[selectedKey],
            selected: true,
            selectedColor: GREEN_2,
        };
    }

    function handleDayPress(day) {
        const [y, m, d] = day.dateString.split('-').map(Number);
        onDayPress?.(new Date(y, m - 1, d));
    }

    return (
        <RNCalendar
            current={toDateString(initialDate) ?? toDateString(new Date())}
            onDayPress={handleDayPress}
            markedDates={marked}
            theme={{
                calendarBackground: '#fff',
                todayTextColor: GREEN_2,
                selectedDayBackgroundColor: GREEN_2,
                selectedDayTextColor: '#fff',
                arrowColor: GREEN_2,
                monthTextColor: GREEN_3,
                textSectionTitleColor: GRAY_1,
                dayTextColor: '#222',
                textDisabledColor: '#ccc',
                dotColor: GREEN_2,
                selectedDotColor: '#fff',
            }}
            style={{
                borderRadius: 16,
                elevation: 2,
                shadowColor: '#000',
                shadowOpacity: 0.07,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 2 },
            }}
        />
    );
}
