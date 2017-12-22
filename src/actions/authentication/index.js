// @flow
import axios from "axios";

import * as types from "../types";

export const login = (userName, password) => async dispatch => {
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

export const signup = (userName, email, password) => async dispatch => {
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

export const logout = () => dispatch => {
    localStorage.removeItem("geochallenge-token");
    return dispatch({ type: types.UNAUTHENTICATE_USER });
};

export const fetchUser = async token => {
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
