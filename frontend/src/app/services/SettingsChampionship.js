import axios from 'axios';

// Add a request interceptor
axios.interceptors.request.use(config => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        config.headers.Authorization = 'Bearer ' + user.token;
    }

    return config;
});

class SettingsService {
    async getChampionshipList(){
        return await axios.get("/settings/list");
    }

    async getChampionship(id) {
        return await axios.get("/settings/", {params: {id:Number(id)}});
    }

    async setChampionship(settings) {
        return await axios.post("/settings", settings);
    }

}

export default new SettingsService();
