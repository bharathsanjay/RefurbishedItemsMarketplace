import { axiosInstance } from "./axiosinstance";





export const GetStoreProducts = async (filters) => {
  try {
    const response = await axiosInstance.get("/api/products/fetch-products"); // Make a GET request to the new endpoint "/fetch-products"
    console.log(response.data.storedata)
    return response.storedata;
    
  } catch (error) {
    return error.message;
  }
};




// add a new product
export const AddProduct = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/products/add-product",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};


// edit a product
export const EditProduct = async (id, payload) => {
  try {
    const response = await axiosInstance.put(
      `/api/products/edit-product/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//delete

export const DeleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/products/delete-product/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get all products
// get all products
export const GetProducts = async (filters) => {
  try {
    const response = await axiosInstance.post("/api/products/get-products", filters);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//update product status
export const UpdateProductStatus = async (id, status) => {
    try {
        const response = await
        axiosInstance.put(`/api/products/update-product-status/${id}`, {status});
        return response.data;
    } catch (e) {
        return e.message;
    }
}


export const UploadProductImage = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/products/upload-image-to-product",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetProductById = async(id) => {
  try {
    const response = await axiosInstance.get(
      `/api/products/get-product-by-id/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
}

// place a new bid
export const PlaceNewBid = async (payload) => {
  try {
    const response = await axiosInstance.post(
        "/api/bids/place-new-bid",
        payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get all bids
export const GetAllBids = async (filters) => {
  try {
    const response = await axiosInstance.post(
        "/api/bids/get-all-bids",
        filters
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};