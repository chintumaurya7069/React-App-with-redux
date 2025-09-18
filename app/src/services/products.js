import axiosInstance from "../apiInstance/axiosInstance";


export const getProducts = async() =>{
    try {
        const response = await axiosInstance.get("/product/allProducts");
        return response;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return error.response;
    }
}

export const getProductById = async (productId) => {
  try {
    const response = await axiosInstance.get(`/product/${productId}`);
    return response;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error.response;
  }
};