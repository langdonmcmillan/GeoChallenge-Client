import axios from "axios";
import { Dispatch } from "redux";

import * as types from "../types";
import { GameOptions, default as Game, Guess } from "../../models/game";

export interface UpdateGame {
    type: types.UPDATE_GAME;
    payload: Game;
}

export interface QuitGame {
    type: types.QUIT_GAME;
}

export const createGame = (gameOptions: GameOptions) => async (
    dispatch: Dispatch<UpdateGame>
) => {
    try {
        const response = await axios({
            method: "POST",
            url: "/api/game",
            data: JSON.stringify(gameOptions),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem(
                    "geochallenge-token"
                )}`
            }
        });
        localStorage.setItem("geochallenge-token", response.data.token);
        dispatch({
            type: types.UPDATE_GAME,
            payload: response.data.game
        });
    } catch (error) {
        console.log(error.response.data.message);
    }
};

export const quitGame = () => async (dispatch: Dispatch<QuitGame>) => {
    dispatch({
        type: types.QUIT_GAME
    });
};

export const getQuestion = (gameId: string) => async (
    dispatch: Dispatch<UpdateGame>
) => {
    try {
        const response = await axios({
            method: "GET",
            url: `/api/game/city?gameId=${gameId}`,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem(
                    "geochallenge-token"
                )}`
            }
        });
        dispatch({
            type: types.UPDATE_GAME,
            payload: response.data
        });
    } catch (error) {
        console.log(error.response.data.message);
    }
};

export const submitGuess = (gameId: string, guess: Guess) => async (
    dispatch: Dispatch<UpdateGame>
) => {
    try {
        const response = await axios({
            method: "POST",
            url: `/api/game/city`,
            data: JSON.stringify({ gameId, guess }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem(
                    "geochallenge-token"
                )}`
            }
        });
        dispatch({
            type: types.UPDATE_GAME,
            payload: response.data
        });
    } catch (error) {
        console.log(error.response.data.message);
    }
};
