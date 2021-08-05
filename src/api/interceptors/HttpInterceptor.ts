import globalAxios from 'axios';

/**
 * This will tell the global axios instance to use auth, and the correct base URL.
 */
export function SetupInterceptor(){
    const baseUrl = "test";
    const authJwt = "test";
    globalAxios.interceptors.request.use(
        async config => {
            config.baseURL = baseUrl;
            if(authJwt != null){
                config.headers = {
                    'Authorization': `Bearer ${authJwt}`
                }
            }
            return config;
        },
    )
}