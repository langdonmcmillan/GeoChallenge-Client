import { SET_ERROR } from "../../actions/types";

const defaultState = {
    errorType: undefined,
    message: undefined
};

export default function(state = defaultState, action) {
    switch (action.type) {
        case SET_ERROR:
            const { errorType, message } = action;
            return {
                errorType,
                message
            };
        default:
            return state;
    }
}
