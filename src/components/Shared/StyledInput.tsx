import * as React from "react";
import { Form, Message } from "semantic-ui-react";
import { Field, WrappedFieldProps } from "redux-form";

type Props = {
    icon: string;
    placeholder: string;
    type: string;
    name: string;
    validate: any;
};

const WrappedField = Field as new () => Field<Props>;

export const CheckedField = (props: Props) => {
    return (
        <WrappedField
            name={props.name}
            component={StyledInput}
            type={props.type}
            placeholder={props.placeholder}
            icon={props.icon}
            validate={props.validate}
        />
    );
};

export const StyledInput = (props: Props & WrappedFieldProps) => {
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
