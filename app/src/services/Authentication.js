import toast from "react-hot-toast";
import axiosInstance from "../apiInstance/axiosInstance";

export const registerUser = async (body) => {
  try {
    const response = await axiosInstance.post("/auth/register", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success(response.data.message);
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const loginUser = async (body) => {
  try {
    const response = await axiosInstance.post("/auth/login", body);
    toast.success(response.data.message);
    localStorage.setItem("auth_token", response?.data.token);
    localStorage.setItem("user_id", response?.data.user._id);

    return response.data;
  } catch (error) {
    toast.error(error?.data?.message);
    return error.response;
  }
};  