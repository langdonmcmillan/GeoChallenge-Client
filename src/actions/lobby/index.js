import socketIOClient from "socket.io-client";

import { UPDATE_LOBBY } from "../types";

const socket = socketIOClient("localhost:5000");

export const postMessage = message => dispatch => {
    console.log(message);
    socket.emit("lobby message", message);
};

export const subscribeToLobby = () => dispatch => {
    console.log("here");
    socket.on("lobby message", message => {
        console.log("message", message);
        dispatch({ type: UPDATE_LOBBY, message });
    });
};
