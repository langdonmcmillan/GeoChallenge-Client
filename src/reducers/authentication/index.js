import { LOGIN_USER, LOGOUT_USER } from "../../actions/types";

const defaultState = {
    authenticated: false,
    user: undefined
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                authenticated: true,
                user: action.user
            };
        case LOGOUT_USER:
            return {
                authenticated: false,
                user: null
            };
        default:
            return state;
    }
};
