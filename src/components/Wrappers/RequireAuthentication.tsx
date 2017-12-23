import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { StoreState } from "../../reducers";

interface InjectedProps {
    authenticated: boolean;
}

export default function(
    ComposedComponent: React.ComponentClass<any> | React.StatelessComponent<any>
) {
    class Authentication extends React.Component<InjectedProps> {
        render() {
            return this.props.authenticated ? (
                <ComposedComponent {...this.props} />
            ) : (
                <Redirect to="/" />
            );
        }
    }

    function mapStateToProps(state: StoreState): InjectedProps {
        return { authenticated: state.authentication.authenticated };
    }
    return connect(mapStateToProps)(Authentication);
}
