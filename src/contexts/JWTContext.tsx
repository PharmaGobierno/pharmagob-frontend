import React, { createContext, useEffect, useReducer } from 'react';

// third-party
import { jwtDecode } from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from '../store/actions';
import accountReducer from '../store/accountReducer';

// project imports
import Loader from '../ui-components/Loader';
import axios from '../utils/axios';

// types
import { KeyedObject } from '../types';
import { InitialLoginContextProps, JWTContextType } from '../types/auth';

// constant
const initialState: InitialLoginContextProps = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

const verifyToken: (st: string) => boolean = (serviceToken) => {
    if (!serviceToken) {
        return false;
    }
    const decoded: KeyedObject = jwtDecode(serviceToken);
    return decoded.exp > Date.now() / 15000;
};

const setSession = (serviceToken?: string | null, refresh_token?:string | null) => {
    if (serviceToken && refresh_token) {
        localStorage.setItem('serviceToken', serviceToken);
        localStorage.setItem('refresh_token', refresh_token);
        axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
    } else {
        localStorage.removeItem('serviceToken');
        localStorage.removeItem('refresh_token');
        delete axios.defaults.headers.common.Authorization;
    }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext<JWTContextType | null>(null);

export const JWTProvider = ({ children }: { children: React.ReactElement }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);

    useEffect(() => {
        const init = async () => {
            
            try {
                const serviceToken = window.localStorage.getItem('serviceToken');
                const refresh = window.localStorage.getItem('refresh_token');
                if (serviceToken && refresh && verifyToken(serviceToken) && verifyToken(refresh)) {
                    const response = await axios.post('/v1/token/refresh', {
                        key: 'AIzaSyBQFlqkqrc80WsmRmSJR4Lgm_YOGUvEYEg',
                        refresh: refresh,
                    })

                    const { access_token, refresh_token ,id_token } = response.data.data
                    setSession(access_token, refresh_token);
                    dispatch({
                        type: LOGIN,
                        payload: {
                            isLoggedIn: true,
                            user: id_token
                        }
                    });
                } else {

                    dispatch({
                        type: LOGOUT
                    });
                    login('test_react','qwerty')
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: LOGOUT
                });
            }
        };
        init();
    }, []);

    const login = async (email: string, password: string) => {

        try {
            const response = await axios.post('/v1/token', {
                key: 'AIzaSyBQFlqkqrc80WsmRmSJR4Lgm_YOGUvEYEg',
                username:email,
                password: password
            })
            console.log(response)
            const statusServiceToken = response.status
            const { access_token, refresh_token ,id_token } = response.data.data
            if ( statusServiceToken === 200){
                setSession(access_token, refresh_token);
                dispatch({
                    type: LOGIN,
                    payload: {
                        isLoggedIn: true,
                        user: id_token
                    }
                }); 
            }
        } catch (error) {
            console.log(error)
        }
    };

    const logout = () => {
        setSession(null, null);
        dispatch({ type: LOGOUT });
    };

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return (
        <JWTContext.Provider value={{ ...state, login, logout}}>{children}</JWTContext.Provider>
    );
};

export default JWTContext;
