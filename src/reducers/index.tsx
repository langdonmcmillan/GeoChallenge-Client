import { combineReducers } from "redux";
import {
    default as authenticationReducer,
    AuthenticationState
} from "./authentication";
import { reducer as formReducer } from "redux-form";

export interface StoreState {
    authentication: AuthenticationState;
    form: any;
}

export default combineReducers({
    form: formReducer,
    authentication: authenticationReducer
});
