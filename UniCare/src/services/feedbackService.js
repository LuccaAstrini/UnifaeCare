import http from './http';

const feedbackService = {
    sendFeedback: (executionId, feedbackData) =>
        http.post(`/app/home/plan/executions/${executionId}/feedback`, feedbackData),
};

export default feedbackService;
