import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

export default function(ComposedComponent, continueTo) {
    console.log("continue to auth", continueTo);
    class Authentication extends Component {
        render() {
            return this.props.authenticated ? (
                <ComposedComponent {...this.props} />
            ) : (
                <Redirect to={{ pathname: "/login", from: continueTo }} />
            );
        }
    }

    Authentication.propTypes = {
        authenticated: PropTypes.bool
    };

    function mapStateToProps(state) {
        return { authenticated: state.authentication.authenticated };
    }
    return connect(mapStateToProps)(Authentication);
}
