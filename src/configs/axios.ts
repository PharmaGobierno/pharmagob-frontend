// Import into global components to have a previous config

import axios from "axios";

axios.defaults.baseURL = "https://pharma-gateway-682pqs65.uc.gateway.dev"
axios.defaults.params = {
    key: "AIzaSyBQFlqkqrc80WsmRmSJR4Lgm_YOGUvEYEg"
}
{
    
}


// Optional
export const Authenticate = async () => {
    try {
        const response = await axios.post("/v1/token", {
            key: "AIzaSyBQFlqkqrc80WsmRmSJR4Lgm_YOGUvEYEg",
            username:"test_react",
            password:"qwerty"
        })
        console.log(response)
    }catch(error){
        console.log(error, typeof error)
    }
}


export const ReAuthenticate = async () => {

}
