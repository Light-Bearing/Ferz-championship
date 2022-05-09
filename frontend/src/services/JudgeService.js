import axios from 'axios';

// Add a request interceptor
axios.interceptors.request.use(config => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        const token = 'Bearer ' + user.token;
        config.headers.Authorization = token;
    }

    return config;
});

class JudgeService {
    async setJudgeRating(param) {
        return await axios.post("/api/judge",param);
    }

    async getPmBoard() {
        return await axios.get("/api/test/pm");
    }

    async getAdminBoard() {
        return await axios.get("/api/test/admin");
    }

    async getMainJudgeBoard() {
        return await axios.get("/api/test/main_judge");
    }
}

export default new JudgeService();