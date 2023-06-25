import { axiosInstance } from "./axiosinstance";


export const GetProductsSearch = async (payload) => {
    try {
        const response = await axiosInstance.post('api/products/fetch-products', payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
};