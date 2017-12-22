import React from "react";
import { Form, Message } from "semantic-ui-react";

export const StyledInput = props => {
    return (
        <div>
            <Form.Input
                {...props.input}
                fluid
                icon={props.icon}
                iconPosition="left"
                placeholder={props.placeholder}
                type={props.type}
                error={props.meta.touched && props.meta.error}
            />
            {props.meta.touched &&
                props.meta.error && (
                    <Message
                        size="tiny"
                        error
                        content={props.meta.error}
                        attached="bottom"
                    />
                )}
        </div>
    );
};
