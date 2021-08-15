import axios from "axios";

class AuthenticationService {
    signin = (username, password) => {
        return axios.post("/api/auth/signin", {username, password})
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    }

    signOut() {
        localStorage.removeItem("user");
    }

    register = async (surname, name, patronymic, username, email, rolesId, password) => {
        return axios.post("/api/auth/signup", {
            surname,
            name,
            patronymic,
            username,
            email,
            rolesId,
            password
        });
    }
    getRoles = async () => {
        return await axios.get("/api/auth/roles")
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthenticationService();