import http from './http';

const exerciseService = {
    getExerciseByPrescriptionItemId: (prescriptionItemId) =>
        http.get(`/app/home/plan/exercises/${prescriptionItemId}`),
    completeExercise: (exerciseId) =>
        http.post(`/app/home/plan/exercises/${exerciseId}/complete`),
};

export default exerciseService;
