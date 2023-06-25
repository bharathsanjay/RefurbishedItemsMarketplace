import { axiosInstance } from "./axiosinstance";


export const GetProductsSearch = async (payload) => {
    try {
        console.log("psearch" )
        const response = await axiosInstance.post('api/search/fetch-products', payload);
        console.log("psearch" + response)
        return response.data;
    } catch (error) {
        return error.message;
    }
};


export const GetFetchById = async(id) => {
    try {
      const response = await axiosInstance.get(
        `/api/search/fetch-by-id/${id}`
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }