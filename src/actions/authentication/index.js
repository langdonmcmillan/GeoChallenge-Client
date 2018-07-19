import axios from "axios";

import { LOGIN_USER, LOGOUT_USER } from "../types";
import { LOGIN_ERROR, SIGNUP_ERROR } from "../error/errorTypes";
import { setError } from "../error/index";

export const login = (name, password) => async dispatch => {
    try {
        const user = { name, email: name, password };
        const response = await axios({
            method: "POST",
            url: "/api/login",
            data: JSON.stringify({ user }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        });
        setUserInformation(response.data, dispatch);
    } catch (error) {
        setError(LOGIN_ERROR, error.response.data.message);
    }
};

export const signup = (name, email, password, isGuest) => async dispatch => {
    try {
        const user = { name, email, password, isGuest };
        const response = await axios({
            method: "POST",
            url: "/api/user",
            data: JSON.stringify({ user }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        });

        setUserInformation(response.data, dispatch);
    } catch (error) {
        setError(SIGNUP_ERROR, error.response.data.message);
    }
};

const setUserInformation = (data, dispatch) => {
    const { token, user } = data;
    localStorage.setItem("geochallenge-token", token);
    dispatch({
        type: LOGIN_USER,
        user
    });
};

export const logout = () => dispatch => {
    localStorage.removeItem("geochallenge-token");
    dispatch({ type: LOGOUT_USER });
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
        return undefined;
    }
};
