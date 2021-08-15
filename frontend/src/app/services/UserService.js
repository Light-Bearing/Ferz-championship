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

class UserService {
    async getUserList() {
        return await axios.get("/api/auth");
    }

    async setNewUser(rider) {
        return await axios.post("/api/auth", rider);
    }

    async deleteUser(id) {
        return await axios.delete("/api/auth/" + id);
    }

    async setUpdateUser(rider) {
        return await axios.put("/api/auth/" + rider.id, rider)
    }
}

export default new UserService();
