import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authenticationReducer from "./authentication";
import lobbyReducer from "./lobby";
import errorReducer from "./shared/error";

export default combineReducers({
    form: formReducer,
    authentication: authenticationReducer,
    error: errorReducer,
    lobby: lobbyReducer
});
