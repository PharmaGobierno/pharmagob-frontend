// Import into global components to have a previous config

import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = "https://pharma-gateway-682pqs65.uc.gateway.dev"
axios.defaults.params = {
    key: "AIzaSyBQFlqkqrc80WsmRmSJR4Lgm_YOGUvEYEg"
}


interface AuthData {
    access_token: string,
    expires_in: number,
    refresh_expires_in: number,
    refresh_token: string,
    token_type: string
}

// Manager
export const Authentication = () => {
    const [isTokenExpired, setTokenExpired] = useState(true)
    const [isRefreshExpired, setRefreshExpired] = useState(true)
    const [data, setData] = useState<AuthData>({
        access_token: "",
        expires_in: 0,
        refresh_expires_in: 0,
        token_type: "",
        refresh_token: ""
    })
    
    const login = async () => {
        const _data = await getToken()

        setRefreshExpired(false)
        setData(_data)
        
        setTimeout(() => {
            if(data.access_token === _data.access_token) setTokenExpired(true)
        }, data.expires_in)
    }

    const refresh = async () => {
        const _data = await refreshToken(data?.refresh_token)

        if(!_data) {
            setRefreshExpired(true) 
            return
        }

        setData(_data)
    }

    useEffect(() => {
        login()
    }, [isRefreshExpired])

    useEffect(() => {
        if(!isRefreshExpired) refresh()
    }, [isTokenExpired])

    return <div/>
}

// Actions
export const getToken = async () => {
    try {
        const response = await axios.post("/v1/token", {
            key: "AIzaSyBQFlqkqrc80WsmRmSJR4Lgm_YOGUvEYEg",
            username:"test_react",
            password:"qwerty"
        })

        const data = response.data.data
        return data
    }catch(error){
        console.log(error, typeof error)
        return null
    }
}


export const refreshToken = async (token: string) => {
    try {
        const response = await axios.post("/v1/token/refresh", {
            key: "AIzaSyBQFlqkqrc80WsmRmSJR4Lgm_YOGUvEYEg",
            refresh: token
        })
        const data = response?.data?.data
        return data
    }catch(error){
        console.log(error, typeof error)
        return null
    }
}
