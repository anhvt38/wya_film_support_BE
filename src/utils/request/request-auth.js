import axios from "axios"; 
import { getSession } from "next-auth/react";

const HOST_API = process.env.HOST_API;

const request = axios.create({
  baseURL : `${HOST_API}`,
  headers: {

    // "Content-Type": "multipart/form-data",
    "Content-Type": "application/json",
    timeout : 30 * 1000,  
  }, 
  // .. other options
});

request.interceptors.request.use(async (axiosConfig) => {
  const session = await getSession();
    axiosConfig.headers = {
      'Authorization': `Bearer ${session?.user.jwt}`,
      ...axiosConfig.headers,
    };
  
    return axiosConfig;
});
  
request.interceptors.response.use(
    (response) => response.data,
    (error) => {
      const { status } = error.response;
  
      return Promise.reject(error);
    }
  );
  

export default request;