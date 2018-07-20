import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { postMessage, subscribeToLobby } from "../../actions/lobby";

class Play extends Component {
    state = {
        message: null
    };
    componentDidMount = () => {
        this.props.subscribeToLobby();
    };
    updateValue = e => {
        this.setState({
            message: e.target.value
        });
    };
    postMessage = () => {
        this.props.postMessage(this.state.message);
    };
    render() {
        return (
            <div>
                <ul id="messages" />
                <form action="">
                    <input
                        onChange={this.updateValue}
                        id="m"
                        autoComplete="off"
                    />
                    <button type="button" onClick={this.postMessage}>
                        Send
                    </button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { messages: state.lobby.messages };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({ postMessage, subscribeToLobby }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Play);
