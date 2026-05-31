import http from './http';

const authService = {
    login: (email, password) =>
        http.post('/auth/login', { email, password, accessMode: 'APP', appId: 1 }),
    acceptTerms: () =>
        http.post('/auth/consent/accept', { consentTermId: 2 }),
};

export default authService;
