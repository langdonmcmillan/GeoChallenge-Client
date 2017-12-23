import * as React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { reduxForm, FormProps } from "redux-form";
import {
    Button,
    Form,
    Grid,
    Header,
    Segment,
    Message
} from "semantic-ui-react";
import { required } from "redux-form-validators";

import { login, Login as LoginAction } from "../../actions/authentication";
import { CheckedField } from "../../components/Shared/StyledInput";
import User from "../../models/user";

type Props = {
    login: (user: User) => { message: string; success: boolean };
    pristine: boolean;
    submitting: boolean;
    handleSubmit: any;
} & FormProps;

class Login extends React.Component<Props> {
    state = {
        errorMessage: null,
        loggedIn: false
    };
    handleFormSubmit = async ({ userName, password }: User) => {
        const response = await this.props.login({ userName, password });
        this.setState({
            errorMessage: response.message,
            loggedIn: response.success
        });
    };
    displayErrorMessage = () => {
        if (this.state.errorMessage)
            return <Message error content={this.state.errorMessage} />;

        return "";
    };
    render() {
        if (this.state.loggedIn) return <Redirect to="/" />;
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
                                <CheckedField
                                    name="userName"
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
                                <CheckedField
                                    name="password"
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

const mapDispatchToProps = (dispatch: Dispatch<LoginAction>) =>
    bindActionCreators<any>({ login }, dispatch);

const ConnectedLogin = connect(null, mapDispatchToProps)(Login);

export default reduxForm({
    form: "login"
})(ConnectedLogin as any);
