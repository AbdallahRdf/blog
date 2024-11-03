import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/contexts";

const useCustomAxios = () => {
    const { accessToken } = useContext(AuthContext);

    const customAxios = axios.create({
        baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
        withCredentials: true
    });

    // Set up an interceptor to add Authorization header if accessToken exists
    customAxios.interceptors.request.use(config => {
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    });

    return customAxios;
}

export default useCustomAxios;