const MOCK_APPOINTMENTS = {
    default: [
        { id: '1', time: '08:00', title: 'Consulta com Dr. Carlos Silva', category: 'videocam' },
        { id: '2', time: '10:30', title: 'Avaliação com Nutricionista Ana Lima', category: 'videocam' },
        { id: '3', time: '14:00', title: 'Retorno - Cardiologia', category: 'videocam' },
        { id: '4', time: '16:30', title: 'Acompanhamento Psicológico', category: 'navigate' },
    ],
};

export function getAppointmentsByDate(dateString) {
    return MOCK_APPOINTMENTS[dateString] ?? MOCK_APPOINTMENTS.default;
}
