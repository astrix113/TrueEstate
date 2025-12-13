import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Make sure your backend runs on 5000
});

export const fetchSales = async (params) => {
  try {
    const response = await API.get("/sales", { params });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const fetchFilters = async () => {
  try {
    const response = await API.get("/sales/filters");
    return response.data.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
