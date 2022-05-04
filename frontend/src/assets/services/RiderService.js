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

class RiderService {
    async getRiderList() {
        return await axios.get("/riders");
    }

    async setNewRider(rider) {
        return await axios.post("/riders", rider);
    }

    async deleteRider(id) {
        return await axios.delete("/riders/" + id);
    }

    async setUpdateRider(rider) {
        return await axios.put("/riders/" + rider.id, rider)
    }
}

export default new RiderService();
