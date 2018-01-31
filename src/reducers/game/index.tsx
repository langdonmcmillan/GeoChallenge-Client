import * as types from "../../actions/types";
import { UpdateGame, QuitGame } from "../../actions/game";
import Game from "../../models/game";

type GameAction = UpdateGame | QuitGame;

export const DefaultGameState: Game = {};

export default function(state: Game = {}, action: GameAction) {
    switch (action.type) {
        case types.UPDATE_GAME:
            return action.payload;
        case types.QUIT_GAME:
            return DefaultGameState;
        default:
            return state;
    }
}
