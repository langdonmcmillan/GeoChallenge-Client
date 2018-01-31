import * as React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { reduxForm, FormProps, Field } from "redux-form";
import {
    Button,
    Form,
    Grid,
    Header,
    Segment,
    Message,
    Icon
} from "semantic-ui-react";

import { createGame, UpdateGame } from "../../actions/game";
import { GameOptions } from "../../models/game";
import { StoreState } from "../../reducers";

type Props = {
    createGame: (
        gameOptions: GameOptions
    ) => { message: string; success: boolean };
    userName: string;
    pristine: boolean;
    submitting: boolean;
    handleSubmit: any;
} & FormProps;

class NewGame extends React.Component<Props> {
    state = {
        errorMessage: null
    };
    handleFormSubmit = async ({ difficulty }: { difficulty: string }) => {
        await this.props.createGame({ difficulty });
    };
    displayErrorMessage = () => {
        if (this.state.errorMessage)
            return <Message error content={this.state.errorMessage} />;

        return "";
    };
    render() {
        const { handleSubmit, submitting } = this.props;
        return (
            <Grid
                textAlign="center"
                style={{ height: "100%" }}
                verticalAlign="middle"
            >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" color="blue" textAlign="center">
                        Select Game Options
                    </Header>
                    <Form error size="large">
                        <Segment stacked>
                            {this.displayErrorMessage()}
                            <div>
                                <Icon name="user" />
                                <label>User </label>
                                <Message content={this.props.userName} />
                            </div>
                            <Form.Field>
                                <label>Difficulty </label>
                                <Field
                                    name="difficulty"
                                    component="select"
                                    placeholder="Difficulty"
                                >
                                    <option value="EASY">Easy</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="HARD">Hard</option>
                                </Field>
                            </Form.Field>
                            <Button
                                primary
                                fluid
                                size="large"
                                disabled={submitting}
                                onClick={handleSubmit(this.handleFormSubmit)}
                            >
                                Create Game
                            </Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<UpdateGame>) =>
    bindActionCreators<any>({ createGame }, dispatch);

const mapStateToProps = (state: StoreState) => {
    return { userName: state.authentication.user.userName };
};

const ConnectedNewGame = connect(mapStateToProps, mapDispatchToProps)(NewGame);

export default reduxForm({
    form: "newGame",
    initialValues: {
        difficulty: "MEDIUM"
    }
})(ConnectedNewGame as any);
