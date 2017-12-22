import * as types from "../../actions/types";

const defaultState = {
    authenticated: false,
    user: {
        userName: "Guest",
        email: "",
        _id: ""
    }
};

export default function(state = defaultState, action) {
    switch (action.type) {
        case types.AUTHENTICATE_USER:
            return {
                ...state,
                authenticated: true,
                user: action.payload
            };
        case types.UNAUTHENTICATE_USER:
            return { ...state, authenticated: false, user: null };
        default:
            return state;
    }
}
