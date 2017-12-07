import axios from "axios";
import * as actions from "./types";

export function authenticate(isLoggedIn) {
    console.log(("loggedin:", isLoggedIn));
    return {
        type: actions.CHANGE_AUTH,
        payload: isLoggedIn
    };
}
