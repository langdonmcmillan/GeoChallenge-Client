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
                {this.props.authenticated && (
                    <Menu.Item as={Link} to="/profile" name="profile">
                        {this.props.userName}
                    </Menu.Item>
                )}
                <Menu.Menu position="right">
                    {this.props.authenticated ? (
                        <LogOutButton handleClick={this.callLogout} />
                    ) : (
                        <LogInButton />
                    )}
                </Menu.Menu>
            </Menu>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.authentication.authenticated,
        user: state.authentication.user
    };
}

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
