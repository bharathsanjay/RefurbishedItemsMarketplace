import { axiosInstance } from "./axiosinstance";
const searchUrl ="https://storerestapi.com/products";

export const GetProductsSearch = async () => {
    try {
        const response = await axiosInstance.get(searchUrl);
        return response.data;
    } catch (error) {
        return error.message;
    }
};