import { combineReducers } from "redux";
import {
    default as authenticationReducer,
    AuthenticationState,
    DefaultAuthenticationState
} from "./authentication";
import { reducer as formReducer } from "redux-form";

export interface StoreState {
    authentication: AuthenticationState;
    form: any;
}

export const DefaultState: StoreState = {
    authentication: DefaultAuthenticationState,
    form: null
};

export default combineReducers<StoreState>({
    form: formReducer,
    authentication: authenticationReducer
});
