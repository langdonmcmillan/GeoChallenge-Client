import { combineReducers } from "redux";
import {
    default as authenticationReducer,
    DefaultAuthenticationState
} from "./authentication";
import Authentication from "../models/authentication";
import { default as gameReducer, DefaultGameState } from "./game";
import Game from "../models/game";
import { reducer as formReducer } from "redux-form";

export interface StoreState {
    authentication: Authentication;
    form: any;
    game: Game;
}

export const DefaultState: StoreState = {
    authentication: DefaultAuthenticationState,
    form: null,
    game: DefaultGameState
};

export default combineReducers<StoreState>({
    form: formReducer,
    authentication: authenticationReducer,
    game: gameReducer
});
