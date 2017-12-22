import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";
import { fetchUser } from "./actions/authentication";
import { AUTHENTICATE_USER } from "./actions/types";

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
