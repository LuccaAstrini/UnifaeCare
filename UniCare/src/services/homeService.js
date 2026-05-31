import http from './http';

const homeService = {
    getHomeInfo: () => http.get('/app/home'),
    getUserInfo: () => http.get('/app/home/profile'),
    getUserPhoto: (userId) => http.get(`/app/home/profile/photo/${userId}`),
    postUserPhoto: (photoData) => http.post('/app/home/profile/photo', photoData),
};

export default homeService;
