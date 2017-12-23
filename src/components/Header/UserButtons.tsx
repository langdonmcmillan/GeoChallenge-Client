import * as React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

interface Props {
    handleClick: () => void;
}

export const LogInButton = () => {
    return (
        <Menu.Item as={Link} to="/login" name="login">
            Log In
        </Menu.Item>
    );
};

export const LogOutButton = (props: Props) => {
    return (
        <Menu.Item as={Link} to="/" onClick={props.handleClick}>
            Log Out
        </Menu.Item>
    );
};
