import axios from "axios";

axios.defaults.baseURL = "https://e-commerce-uh9v.onrender.com";
axios.defaults.withCredentials = true;

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

export const getCart = async () => {
    try {
        return await axios.get(`/api/cart`);
    } catch (error) {
        console.log("Error while fetching cart: ", error.message);
        return error.response;
    }
};

export const addToCart = async (productId, quantity = 1) => {
    try {
        return await axios.post(`/api/cart/add`, { productId, quantity });
    } catch (error) {
        console.log("Error while adding to cart: ", error.message);
        return error.response;
    }
};

export const removeFromCart = async (productId) => {
    try {
        return await axios.post(`/api/cart/remove`, { productId });
    } catch (error) {
        console.log("Error while removing from cart: ", error.message);
        return error.response;
    }
};

export const updateCartItemQuantity = async (productId, quantity) => {
    try {
        return await axios.post(`/api/cart/update`, { productId, quantity });
    } catch (error) {
        console.log("Error while updating cart item quantity: ", error.message);
        return error.response;
    }
};

export const generateRazorpayOrder = async (amount) => {
    try {
        return await axios.post(`/api/placeorder`, { amount });
    } catch (error) {
        console.log("Error while generating Razorpay order: ", error.message);
        return error.response;
    }
};

export const generateCartRazorpayOrder = async () => {
    try {
        return await axios.post(`/api/cart/pay`);
    } catch (error) {
        console.log(
            "Error while generating cart Razorpay order: ",
            error.message
        );
        return error.response;
    }
};
