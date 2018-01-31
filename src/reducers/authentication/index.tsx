import * as types from "../../actions/types";
import * as actions from "../../actions/authentication";
import Authentication from "../../models/authentication";

type AuthenticationAction = actions.Login | actions.Logout | actions.Signup;

export const DefaultAuthenticationState: Authentication = {
    authenticated: false,
    user: { userName: "Guest" }
};

export default function(
    state: Authentication = DefaultAuthenticationState,
    action: AuthenticationAction
) {
    switch (action.type) {
        case types.AUTHENTICATE_USER:
            return {
                ...state,
                authenticated: true,
                user: action.payload
            };
        case types.UNAUTHENTICATE_USER:
            return DefaultAuthenticationState;
        default:
            return state;
    }
}
