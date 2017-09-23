import React, { Component } from "react";
import { Container, Menu, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

class componentName extends Component {
  render() {
    return (
      <Menu inverted>
        <Menu.Item as={Link} to="/" exact header name="home">
          Home
        </Menu.Item>
        <Menu.Item as={Link} to="/" name="play">
          Play
        </Menu.Item>
        <Menu.Item as={Link} to="/" name="learn">
          Learn
        </Menu.Item>
        <Menu.Item as={Link} to="/" name="about">
          About
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item as={Link} to="/login" name="login">
            Log In
          </Menu.Item>
          <Menu.Item as={Link} to="/" name="signup">
            Sign Up
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default componentName;
