import React, { Component } from "react";
import { Container, Menu, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions";

class Header extends Component {
    logout() {
        this.props.authenticate(false);
    }

    render() {
        return (
            <Menu inverted>
                <Menu.Item as={Link} to="/" exact header name="home">
                    Home
                </Menu.Item>
                <Menu.Item as={Link} to="/play" name="play">
                    Play
                </Menu.Item>
                <Menu.Item as={Link} to="/learn" name="learn">
                    Learn
                </Menu.Item>
                <Menu.Item as={Link} to="/profile" name="profile">
                    Profile
                </Menu.Item>
                <Menu.Menu position="right">
                    {this.props.authenticated ? (
                        <LogOutButton handleClick={this.logout} />
                    ) : (
                        <LogInButton />
                    )}
                </Menu.Menu>
            </Menu>
        );
    }
}

const LogInButton = () => {
    return (
        <Menu.Item as={Link} to="/login" name="login">
            Log In
        </Menu.Item>
    );
};

const LogOutButton = props => {
    return (
        <Menu.Item as={Link} to="/" name="logout" onClick={props.handleClick}>
            Log Out
        </Menu.Item>
    );
};

function mapStateToProps(state) {
    return { authenticated: state.authenticated };
}

export default connect(mapStateToProps, actions)(Header);
