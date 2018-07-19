import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import Home from "./Home";
import Login from "./Login";
import Header from "./Header";
import Learn from "./Learn";
import Play from "./Play";
import Profile from "./Profile";
import Signup from "./Signup";
import RequireAuthentication from "./Wrappers/RequireAuthentication";

class App extends Component {
    componentDidMount() {}

    render() {
        return (
            <Container>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route path="/" exact component={Home} />
                        <Route
                            path="/play"
                            component={RequireAuthentication(Play, "play")}
                        />
                        <Route path="/learn" component={Learn} />
                        <Route
                            path="/profile"
                            component={RequireAuthentication(
                                Profile,
                                "profile"
                            )}
                        />
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Signup} />
                    </div>
                </BrowserRouter>
            </Container>
        );
    }
}

export default App;
