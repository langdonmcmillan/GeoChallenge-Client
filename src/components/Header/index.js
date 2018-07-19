import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Menu } from "semantic-ui-react";

import { logout } from "../../actions/authentication";
import { LogInButton, LogOutButton } from "./UserButtons";

class Header extends Component {
    callLogout = () => {
        this.props.logout();
    };

    render() {
        const { authenticated, user } = this.props.authentication;
        return (
            <Menu inverted>
                <Menu.Item as={Link} to="/" exact header name="home">
                    GeoChallenge
                </Menu.Item>
                <Menu.Item as={Link} to="/play" name="play">
                    Play
                </Menu.Item>
                <Menu.Item as={Link} to="/learn" name="learn">
                    Learn
                </Menu.Item>
                {authenticated && (
                    <Menu.Item as={Link} to="/profile" name="profile">
                        {user.name}
                    </Menu.Item>
                )}
                <Menu.Menu position="right">
                    {authenticated ? (
                        <LogOutButton handleClick={this.callLogout} />
                    ) : (
                        <LogInButton />
                    )}
                </Menu.Menu>
            </Menu>
        );
    }
}

const mapStateToProps = state => {
    return {
        authentication: state.authentication
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
