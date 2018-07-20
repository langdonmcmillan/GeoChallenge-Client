import { UPDATE_LOBBY } from "../../actions/types";

const defaultState = {
    messages: []
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case UPDATE_LOBBY:
            return {
                messages: state.messages.concat(action.message)
            };
        default:
            return state;
    }
};
