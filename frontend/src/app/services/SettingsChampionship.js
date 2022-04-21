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

class SettingsService {
    async getSettings() {
        return await axios.get("/settings");
    }

    async setSettings(settings) {
        return await axios.post("/settings", settings);
    }

}

export default new SettingsService();
