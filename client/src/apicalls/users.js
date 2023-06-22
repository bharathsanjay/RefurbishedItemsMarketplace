import {axiosInstance} from "./axiosInstance";

// register user

export const RegisterUser = async (payload) => {
    try {
        const response = await axiosInstance.post("api/users/register", payload)
        return response.data;
    } catch (error) {
        return error.message
    }
}

export const LoginUser = async (payload) => {
    try {
        const response = await axiosInstance.post("api/users/login", payload)
        return response.data;
    } catch (error) {
        return error.message;
    }
}

export const GetCurrentUser = async (payload) => {
    try {
        const response = await axiosInstance.get("api/users/get-current-user")
        return response.data;
    } catch (error) {
        return error.message;
    }
}