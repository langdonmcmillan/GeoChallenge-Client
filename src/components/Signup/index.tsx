import * as React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Redirect } from "react-router-dom";
import { FormProps } from "redux-form";
import {
    Button,
    Form,
    Grid,
    Header,
    Segment,
    Message
} from "semantic-ui-react";
import { required, email, length, confirmation } from "redux-form-validators";

import { signup, Signup as SignupAction } from "../../actions/authentication";
import { CheckedField } from "../../components/Shared/StyledInput";
import User from "../../models/user";

type Props = {
    signup: (user: User) => { message: string; success: boolean };
    pristine: boolean;
    submitting: boolean;
    handleSubmit: any;
} & FormProps;

class Signup extends React.Component<Props, object> {
    state = {
        errorMessage: null,
        signedUp: false
    };
    handleFormSubmit = async ({ userName, email, password }: User) => {
        const response = await this.props.signup({ userName, email, password });
        this.setState({
            errorMessage: response.message,
            signedUp: response.success
        });
    };
    displayErrorMessage = () => {
        if (this.state.errorMessage)
            return <Message error content={this.state.errorMessage} />;

        return "";
    };
    render() {
        if (this.state.signedUp) return <Redirect to="/" />;
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
                                <CheckedField
                                    name="userName"
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
                                <CheckedField
                                    name="email"
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
                                <CheckedField
                                    name="password"
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
                                <CheckedField
                                    name="passwordConfirmation"
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

const mapDispatchToProps = (dispatch: Dispatch<SignupAction>) =>
    bindActionCreators<any>({ signup }, dispatch);

const ConnectedSignup = connect(null, mapDispatchToProps)(Signup);

export default reduxForm({
    form: "signup"
})(ConnectedSignup as any);
