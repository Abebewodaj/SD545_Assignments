import axios from "axios";


export const axiosInstance = axios.create({
  baseURL:"http://localhost:9000/api/",
  headers:{
    "Content-Type":"application/json"
  }
})
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
//export default instance