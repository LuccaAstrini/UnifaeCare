import authService from './authService';
import homeService from './homeService';
import exerciseService from './exerciseService';
import feedbackService from './feedbackService';

const ApiService = {
    ...authService,
    ...homeService,
    ...exerciseService,
    ...feedbackService,
};

export default ApiService;
