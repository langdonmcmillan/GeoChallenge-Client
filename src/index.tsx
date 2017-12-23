import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import "semantic-ui-css/semantic.min.css";

import App from "./components/App";
import reducers from "./reducers";
import { fetchUser } from "./actions/authentication";
import { AUTHENTICATE_USER } from "./actions/types";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers,
    {},
    composeEnhancers(applyMiddleware(reduxThunk))
);

const token = localStorage.getItem("geochallenge-token");
if (token) {
    fetchUser(token).then(function(user) {
        if (user) store.dispatch({ type: AUTHENTICATE_USER, payload: user });
    });
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
