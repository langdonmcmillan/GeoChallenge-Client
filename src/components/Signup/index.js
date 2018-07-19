import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import {
    Button,
    Form,
    Grid,
    Header,
    Segment,
    Message
} from "semantic-ui-react";
import { required, email, length, confirmation } from "redux-form-validators";
import { Redirect } from "react-router-dom";

import { signup } from "../../actions/authentication";
import StyledInput from "../../components/Shared/StyledInput";
import { SIGNUP_ERROR } from "../../actions/error/errorTypes";

class Signup extends Component {
    handleFormSubmit = ({ name, email, password }) => {
        this.props.signup(name, email, password);
    };

    displayErrorMessage = () => {
        if (this.props.error.errorType === SIGNUP_ERROR)
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
                        Create a Profile
                    </Header>
                    <Form error size="large">
                        <Segment stacked>
                            {this.displayErrorMessage()}
                            <Form.Field>
                                <Field
                                    name="name"
                                    component={StyledInput}
                                    type="text"
                                    placeholder="User Name"
                                    icon="user"
                                    validate={[
                                        required({
                                            msg: "User Name is required."
                                        }),
                                        length({
                                            max: 100,
                                            msg: "Maximum 100 characters."
                                        })
                                    ]}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Field
                                    name="email"
                                    component={StyledInput}
                                    type="text"
                                    placeholder="Email"
                                    icon="mail"
                                    validate={[
                                        required({
                                            msg: "Email is required."
                                        }),
                                        email({ msg: "Invalid email." }),
                                        length({
                                            max: 100,
                                            msg: "Maximum 254 characters."
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
                                        }),
                                        length({
                                            max: 15,
                                            msg: "Maximum 15 characters."
                                        })
                                    ]}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Field
                                    name="passwordConfirmation"
                                    component={StyledInput}
                                    type="password"
                                    placeholder="Confirm Password"
                                    icon="lock"
                                    validate={[
                                        confirmation({
                                            msg: "Password fields must match.",
                                            field: "password"
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
                                Sign Up
                            </Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return { user: state.authentication.user, error: state.error };
};

const mapDispatchToProps = dispatch => bindActionCreators({ signup }, dispatch);

const ConnectedSignup = connect(
    mapStateToProps,
    mapDispatchToProps
)(Signup);

export default reduxForm({
    form: "signup"
})(ConnectedSignup);
