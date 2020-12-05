import React, { Component, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';

export default class JsonFormField extends Component {
    render() {
        const { currentValue } = this.props;
        let inputField;
        inputField = (
            <TextField
                style={formInputStyle}
                label="Paste JSON"
                value={currentValue}
                multiline
                rows={28}
                variant='outlined'
                autoFocus
                fullWidth
                margin='none'
            />
        );
        return (
            <Fragment>
                {inputField}
            </Fragment>
        );
    };
};
var formInputStyle = {
    fontSize: '12px',
};

