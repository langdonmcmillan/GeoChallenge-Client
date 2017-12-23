import * as React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Menu } from "semantic-ui-react";

import { logout, Logout } from "../../actions/authentication";
import { StoreState } from "../../reducers";
import { LogInButton, LogOutButton } from "./UserButtons";

interface Props {
    authenticated: boolean;
    userName: string;
}

interface DispatchProps {
    logout: () => void;
}

class Header extends React.Component<Props & DispatchProps> {
    callLogout = () => {
        this.props.logout();
        console.log("props", this.props);
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

function mapStateToProps(state: StoreState): Props {
    return {
        authenticated: state.authentication.authenticated,
        userName: state.authentication.user.userName
    };
}

const mapDispatchToProps = (dispatch: Dispatch<Logout>): DispatchProps =>
    bindActionCreators<any>({ logout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
