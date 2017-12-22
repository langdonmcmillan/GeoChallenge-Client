import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import type { FormProps } from "redux-form";
import {
    Button,
    Form,
    Grid,
    Header,
    Segment,
    Message
} from "semantic-ui-react";
import { required, email, length, confirmation } from "redux-form-validators";

import { signup } from "../../actions/authentication";
import { StyledInput } from "../../components/Shared/StyledInput";

class Signup extends Component {
    state = {
        errorMessage: null
    };
    handleFormSubmit = async ({ userName, email, password }) => {
        const response = await this.props.signup(userName, email, password);
        if (response.success) this.props.history.push("/");
        this.setState({ errorMessage: response.message });
    };
    displayErrorMessage = () => {
        if (this.state.errorMessage)
            return <Message error content={this.state.errorMessage} />;

        return "";
    };
    render() {
        const { handleSubmit, pristine, submitting } = this.props;
        return (
            <Grid
                textAlign="center"
                style={{ height: "100%" }}
                verticalAlign="middle"
            >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" color="blue" textAlign="center">
                        Create an Account
                    </Header>
                    <Form error size="large">
                        <Segment stacked>
                            {this.displayErrorMessage()}
                            <Form.Field>
                                <Field
                                    name="userName"
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
                                            msg: "Maximum 100 characters."
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
                                            max: 100,
                                            msg: "Maximum 100 characters."
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

const mapDispatchToProps = dispatch => bindActionCreators({ signup }, dispatch);

const ConnectedSignup = connect(null, mapDispatchToProps)(Signup);

export default reduxForm({
    form: "signup"
})(ConnectedSignup);
