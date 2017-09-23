import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Container } from "semantic-ui-react";
import Landing from "./Landing";
import Login from "./Login";
import Header from "./Header";

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <Container>
        <BrowserRouter>
          <div>
            <Header />
            <Route path="/" exact component={Landing} />
            <Route path="/login" component={Login} />
          </div>
        </BrowserRouter>
      </Container>
    );
  }
}

export default App;
