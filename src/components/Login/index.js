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
import { required } from "redux-form-validators";

import { login } from "../../actions/authentication";
import { StyledInput } from "../../components/Shared/StyledInput";

class Login extends Component {
    state = {
        errorMessage: null
    };
    handleFormSubmit = async ({ userName, password }) => {
        const response = await this.props.login(userName, password);
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
                        Log-in to your account
                    </Header>
                    <Form error size="large">
                        <Segment stacked>
                            {this.displayErrorMessage()}
                            <Form.Field>
                                <Field
                                    name="userName"
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
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ login }, dispatch);

const ConnectedLogin = connect(null, mapDispatchToProps)(Login);

export default reduxForm({
    form: "login"
})(ConnectedLogin);
