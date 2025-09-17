import toast from "react-hot-toast";
import axiosInstance from "../apiInstance/axiosInstance";

export const getUser = async () => {
  try {
    const response = await axiosInstance.get("/user/all");
    return response;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error.response;
  }
};


export const addUser = async (body) => {
  try {
    const response = await axiosInstance.post("/user/addUser", body, {
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

export const updateUser = async (body) => {
  try {
    const response = await axiosInstance.put(`/user/${body.id}`, body);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error.response;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/user/${userId}`);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error.response;
  }
};
