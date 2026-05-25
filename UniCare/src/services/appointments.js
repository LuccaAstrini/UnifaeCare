const MOCK_APPOINTMENTS = {
    default: [
        { id: '1', time: '08:00', title: 'Consulta com Dr. Carlos Silva' },
        { id: '2', time: '10:30', title: 'Avaliação com Nutricionista Ana Lima' },
        { id: '3', time: '14:00', title: 'Retorno - Cardiologia' },
        { id: '4', time: '16:30', title: 'Acompanhamento Psicológico' },
    ],
};

// Replace this function body with an API call when the backend is ready.
export function getAppointmentsByDate(dateString) {
    return MOCK_APPOINTMENTS[dateString] ?? MOCK_APPOINTMENTS.default;
}
