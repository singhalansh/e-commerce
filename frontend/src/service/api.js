import axios from "axios";

const URL = "http://localhost:3000";

export const authenticateSignup = async (user) => {
    try {
        return await axios.post(`/api/signup`, user, { withCredentials: true });
    } catch (error) {
        console.log(
            "sign up ki api me dikkat hai check kar ise! ",
            error.message
        );
    }
};

// Configure axios defaults
axios.defaults.withCredentials = true;

export const authenticateLogin = async (user) => {
    try {
        return await axios.post(`/api/login`, user, { withCredentials: true });
    } catch (error) {
        console.log(
            "login ki api me dikkat hai check kar ise! ",
            error.message
        );
    }
};

export const logoutUser = async () => {
    try {
        return await axios.post(`/api/logout`, {}, { withCredentials: true });
    } catch (error) {
        console.log(
            "logout ki api me dikkat hai check kar ise! ",
            error.message
        );
    }
};

export const getUserDetails = async (userId) => {
    try {
        return await axios.get(`/api/getuser/${userId}`, {
            withCredentials: true,
        });
    } catch (error) {
        console.log(
            "get user details ki api me dikkat hai check kar ise! ",
            error.message
        );
    }
};

export const fetchUserProfile = async () => {
    try {
        // withCredentials is set globally for axios, so cookies will be sent
        return await axios.get(`/api/profile`);
    } catch (error) {
        console.log("Error while fetching user profile: ", error.message);
        return error.response;
    }
};
