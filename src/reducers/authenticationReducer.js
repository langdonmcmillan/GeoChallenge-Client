import * as actions from "../actions/types";

export default function(state = false, action) {
    switch (action.type) {
        case actions.CHANGE_AUTH:
            return action.payload;
        default:
            return state;
    }
}
