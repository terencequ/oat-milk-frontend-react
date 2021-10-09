import globalAxios from 'axios';
import {store} from "../../redux/store";

/**
 * This will tell the global axios instance to use users, and the correct base URL.
 */
export function SetupGlobalAxiosInterceptor(){
    const baseUrl = process.env.REACT_APP_API_URL;
    const artificialDelay = 0; // in milliseconds

    console.log("set up global axios");
    globalAxios.interceptors.request.use(
        async config => {
            config.baseURL = baseUrl;
            const authJwt = store.getState().users.authToken;
            if(authJwt != null){
                config.headers["Authorization"] = `Bearer ${authJwt}`;
            }
            return await new Promise(resolve => setTimeout(() => resolve(config), artificialDelay));
        },
    )
}