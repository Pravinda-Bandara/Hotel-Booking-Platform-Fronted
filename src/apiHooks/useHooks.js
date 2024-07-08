import apiClient from "../apiClient.js";

export const login = async ({ email, password }) => {
    try {
        const response = await apiClient.post('api/v1/users/signin', { email, password });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error logging in');
    }
};

export const register = async ({ email, password }) => {
    try {
        const response = await apiClient.post('api/v1/users/signup', { email, password });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error registering');
    }
};