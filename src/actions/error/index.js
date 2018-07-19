import { SET_ERROR } from "../types";

export const setError = (errorType, message) => dispatch => {
    dispatch({ type: SET_ERROR, errorType, message });
};

export const clearError = () => dispatch => {
    dispatch({ type: SET_ERROR, errorType: undefined, message: undefined });
};
