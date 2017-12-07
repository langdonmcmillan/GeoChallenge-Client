import React from "react";
import {
    Button,
    Form,
    Grid,
    Header,
    Image,
    Message,
    Segment
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions";

const Login = props => {
    const handleLogin = () => {
        props.authenticate(true);
    };
    return (
        <Grid
            textAlign="center"
            style={{ height: "100%" }}
            verticalAlign="middle"
        >
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="blue" textAlign="center">
                    Log-in to your account
                </Header>
                <Form size="large">
                    <Segment stacked>
                        <Form.Input
                            fluid
                            icon="user"
                            iconPosition="left"
                            placeholder="E-mail address"
                        />
                        <Form.Input
                            fluid
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password"
                            type="password"
                        />
                        <Button
                            primary
                            fluid
                            size="large"
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                    </Segment>
                </Form>
                <Segment>
                    <Link to="/signup">
                        <Button fluid size="large">
                            Sign Up
                        </Button>
                    </Link>
                </Segment>
            </Grid.Column>
        </Grid>
    );
};

function mapStateToProps(state) {
    return { authenticated: state.authenticated };
}

export default connect(mapStateToProps, actions)(Login);
