import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default class ManualFormField extends Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    };

    render() {
        const { title, branches, currentValue, getInput, completeElement,
            inputFor, isCreating, addTitle, branchName, keyPress } = this.props;
        let completeElementButton, inputField, submitButton, completeButton;
        let addToText = inputFor === "Enter Element" ? "add to" : "";

        if (isCreating && !title && inputFor) {
            inputField = (
                <div className="site" >
                    <TextField
                        autoFocus={true}
                        inputRef={this.textInput}
                        style={formInputStyle}
                        label={inputFor}
                        value={currentValue}
                        onKeyDown={keyPress}
                        margin="normal"
                    />
                </div>
            );
            submitButton = (
                <div className="site">
                    <Button
                        variant="text"
                        style={formButtonStyle1}
                        color="primary"
                        onClick={(e) => { getInput(inputFor); this.textInput.current.focus(); }}>
                        <span className='span-text'>
                            {addToText}
                        </span>
                        &nbsp;&nbsp;
                        <span className='main-text'>{
                            inputFor === "Enter Goal" ?
                                "submit goal" :
                                inputFor === "Enter Branch" ?
                                    "add branch" :
                                    inputFor === "Enter Element" ? branchName :
                                        inputFor === "Title (optional)" ? "add title / complete" : "Goal"}
                        </span>
                    </Button>
                </div >)
        }

        if (isCreating && branches && branches.length > 0 && inputFor === "Enter Element") {
            completeElementButton = (
                <div className="site">
                    <Button
                        style={formButtonStyle2}
                        variant="text"
                        size="medium"
                        color="primary"
                        onClick={() => { completeElement(); this.textInput.current.focus(); }}>
                        Next Branch
                    </Button>
                </div>);
            completeButton = (
                <div className="site">
                    <Button
                        style={formButtonStyle3}
                        variant="text"
                        size="medium"
                        color="primary"
                        onClick={() => { addTitle(); this.textInput.current.focus(); }}>
                        add title and complete
                            </Button>
                </div>);
        };

        return (
            <Fragment>
                {inputField}
                {submitButton}
                {completeElementButton}
                {completeButton}
            </Fragment >
        );
    };
};
var formInputStyle = {
    maxWidth: '200px',
    maxHeight: '40px',
    minWidth: '200px',
    minHeight: '40px',
    padding: '0px',
    margin: '0px 0px 20px 0px',
    fontSize: '12px',
};

var formButtonStyle1 = {
    maxWidth: '200px',
    maxHeight: '150px',
    minWidth: '200px',
    minHeight: '40px',
    padding: '0px',
    margin: '0px',
    fontFamily: "Computer Modern TypeWriter",
    fontSize: '15px',
    fontWeight: 750,
    backgroundColor: '#5d6997',
    color: "whitesmoke",
};
var formButtonStyle2 = {
    maxWidth: '200px',
    maxHeight: '150px',
    minWidth: '200px',
    minHeight: '40px',
    padding: '0px',
    margin: '0px',
    fontFamily: "Computer Modern TypeWriter",
    fontSize: '15px',
    fontWeight: 750,
    backgroundColor: '#4f5980',
    color: "whitesmoke",
};

var formButtonStyle3 = {
    maxWidth: '200px',
    maxHeight: '150px',
    minWidth: '200px',
    minHeight: '40px',
    padding: '0px',
    margin: '0px',
    fontFamily: "Computer Modern TypeWriter",
    fontSize: '15px',
    fontWeight: 750,
    backgroundColor: '#444C6D',
    color: "whitesmoke",
};
