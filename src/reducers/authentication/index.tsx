import * as types from "../../actions/types";
import * as actions from "../../actions/authentication";
import User from "../../models/user";

export interface AuthenticationState {
    authenticated: boolean;
    user: User;
}

export const defaultUser: User = {
    userName: "Guest",
    email: "",
    _id: ""
};

type AuthenticationAction = actions.Login | actions.Logout | actions.Signup;

export const DefaultAuthenticationState: AuthenticationState = {
    authenticated: false,
    user: defaultUser
};

export default function(
    state: AuthenticationState = DefaultAuthenticationState,
    action: AuthenticationAction
) {
    console.log("action", action);

    switch (action.type) {
        case types.AUTHENTICATE_USER:
            return {
                ...state,
                authenticated: true,
                user: action.payload
            };
        case types.UNAUTHENTICATE_USER:
            return { ...state, authenticated: false, user: defaultUser };
        default:
            return state;
    }
}
