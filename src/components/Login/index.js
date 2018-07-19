import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { Redirect } from "react-router-dom";
import {
    Button,
    Form,
    Grid,
    Header,
    Segment,
    Message,
    Divider
} from "semantic-ui-react";
import { required } from "redux-form-validators";

import { login, signup } from "../../actions/authentication";
import StyledInput from "../../components/Shared/StyledInput";
import { LOGIN_ERROR } from "../../actions/error/errorTypes";

class Login extends Component {
    state = {
        errorMessage: null
    };
    handleFormSubmit = async ({ name, password }) => {
        this.props.login(name, password);
    };
    handleGuestLogin = async () => {
        this.props.signup(undefined, undefined, undefined, true);
    };
    displayErrorMessage = () => {
        if (this.props.error.errorType === LOGIN_ERROR)
            return <Message error content={this.props.error.message} />;

        return "";
    };
    render() {
        const { handleSubmit, pristine, submitting, location } = this.props;
        if (this.props.user) return <Redirect to={`/${location.from || ""}`} />;
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
                    <Form error size="large">
                        <Segment stacked>
                            {this.displayErrorMessage()}
                            <Form.Field>
                                <Field
                                    name="name"
                                    component={StyledInput}
                                    type="text"
                                    placeholder="User Name/Email"
                                    icon="user"
                                    validate={[
                                        required({
                                            msg: "User Name/Email is required."
                                        })
                                    ]}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Field
                                    name="password"
                                    component={StyledInput}
                                    type="password"
                                    placeholder="Password"
                                    icon="lock"
                                    validate={[
                                        required({
                                            msg: "Password is required."
                                        })
                                    ]}
                                />
                            </Form.Field>
                            <Button
                                primary
                                fluid
                                size="large"
                                disabled={pristine || submitting}
                                onClick={handleSubmit(this.handleFormSubmit)}
                            >
                                Login
                            </Button>
                        </Segment>
                    </Form>
                    <Header as="h2" color="blue" textAlign="center">
                        No Account?
                    </Header>
                    <Segment>
                        <Link to={{ pathname: "/signup", from: location.from }}>
                            <Button primary fluid size="large">
                                Sign Up
                            </Button>
                        </Link>
                        <Divider horizontal>Or</Divider>
                        <Button
                            secondary
                            fluid
                            size="large"
                            onClick={this.handleGuestLogin}
                        >
                            Continue as a Guest
                        </Button>
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return { user: state.authentication.user, error: state.error };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({ login, signup }, dispatch);

const ConnectedLogin = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default reduxForm({
    form: "login"
})(ConnectedLogin);
