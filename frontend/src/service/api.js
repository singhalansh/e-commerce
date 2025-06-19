import axios from "axios";

const URL = "http://localhost:3000";

export const authenticateSignup = async (user) => {
    try {
        return await axios.post(`/api/signup`, user);
    } catch (error) {
        console.log("sign up ki api me dikkat hai check kar ise! ", error.message);
    }
}

export const authenticateLogin = async (user) => {
    try {
        return await axios.post(`/api/login`, user);
    } catch (error) {
        console.log("login ki api me dikkat hai check kar ise! ", error.message);
    }
}

