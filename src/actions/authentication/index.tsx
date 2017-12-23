import axios from "axios";
import { Dispatch, Action } from "redux";

import * as types from "../types";
import User from "../../models/user";

export interface Login {
    type: types.AUTHENTICATE_USER;
    payload: {};
}

export interface Signup {
    type: types.AUTHENTICATE_USER;
    payload: {};
}

export interface Logout {
    type: types.UNAUTHENTICATE_USER;
}

export const login = ({ userName, password }: User) => async (
    dispatch: Dispatch<Login>
) => {
    try {
        const response = await axios({
            method: "POST",
            url: "/api/login",
            data: JSON.stringify({ userName, password }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        });
        localStorage.setItem("geochallenge-token", response.data.token);
        dispatch({
            type: types.AUTHENTICATE_USER,
            payload: response.data.user
        });
        return { success: true };
    } catch (error) {
        return { success: false, message: error.response.data.message };
    }
};

export const signup = ({ userName, email, password }: User) => async (
    dispatch: Dispatch<Signup>
) => {
    try {
        const response = await axios({
            method: "POST",
            url: "/api/signup",
            data: JSON.stringify({ userName, email, password }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        });
        localStorage.setItem("geochallenge-token", response.data.token);
        dispatch({
            type: types.AUTHENTICATE_USER,
            payload: response.data.user
        });
        return { success: true };
    } catch (error) {
        return { success: false, message: error.response.data.message };
    }
};

export const logout = () => (dispatch: Dispatch<Logout>): Action => {
    localStorage.removeItem("geochallenge-token");
    return dispatch({ type: types.UNAUTHENTICATE_USER });
};

export const fetchUser = async (token: string) => {
    try {
        const response = await axios({
            method: "GET",
            url: "/api/user",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return null;
    }
};
