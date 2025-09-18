import axiosInstance from "../apiInstance/axiosInstance";

export const addToCart = async (body) => {
  try {
    const response = await axiosInstance.post("/cart/addToCart", body);
    toast.success(response.data.message);
    return response;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error.response;
  }
};

export const getCart = async (userId) => {
    try {
        const response = await axiosInstance.get(`/cart/${userId}`)
        return response
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return error.response;
    }
}