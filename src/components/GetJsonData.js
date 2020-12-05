import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import BuildDiagram from './BuildDiagram';
import JsonFormField from './JsonFormField';
import imgUrl from '../images/bg-pattern.jpg';
import PopUp from "./PopUp";

export default class GetJsonData extends Component {
    state = {
        currentValue: "",
        goal: "",
        title: "",
        branches: [],
        errorMessage: "",
        warningMessage: [],
        isSampleOpened: false
    };

    handleChange = () => ({ target: { value } }) => {
        console.log(value, "<--")
        this.setState({
            currentValue: value
        });
    };

    checkPropertyNames(obj) {
        let warningMessage;
        let warningText = "Check JSON 'branches' child property names";
        let arr = obj.branches ? obj.branches : [];
        let goal = "";
        let title = "";
        let branches = [];
        let warningsQty = 0;
        let criticalWarnings = "";
        let newArr = [];
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i];
            let count = 0;
            if (!item.hasOwnProperty("name")) {
                warningsQty++;
                count++;
            };
            if (!item.hasOwnProperty("elements")) {
                warningsQty++;
                count++;
            };
            if (count === 0) {
                newArr.push(item);
            };
        }
        if (!obj.hasOwnProperty("title")) {
            warningsQty++;
        } else {
            title = obj.title;
        };
        if (!obj.hasOwnProperty("goal")) {
            criticalWarnings = "Check JSON property name 'goal'";
        } else {
            goal = obj.goal;
        };
        if (!obj.hasOwnProperty("branches")) {
            if (criticalWarnings) {
                criticalWarnings = "Check JSON property names: 'goal', 'branches'";
            } else {
                criticalWarnings = "Check JSON property name 'branches'";
            };
        } else {
            branches = newArr;
        }
        if (criticalWarnings) {
            warningMessage = criticalWarnings;
        } else if (warningsQty > 0) {
            warningMessage = `${warningText} (${warningsQty})`;
        }
        return {
            warningMessage: warningMessage,
            checkedBranchesArr: branches,
            title: title,
            goal: goal
        };
    };

    settingData(value) {
        if (!value) {
            this.setState({
                errorMessage: ""
            });
        } else {
            const [err, result] = this.safeJsonParse(value);
            if (err) {
                this.setState({
                    errorMessage: `JSON isn't completed. ${err.message}.`,
                    goal: "",
                    branches: [],
                    title: "",
                });
            } else {
                let checkedPropertyNames = this.checkPropertyNames(result);
                const { warningMessage, goal, title, checkedBranchesArr } = checkedPropertyNames;
                this.setState({
                    warningMessage: warningMessage,
                    errorMessage: "",
                    goal: goal,
                    branches: checkedBranchesArr.map(object => {
                        let newObj = {};
                        newObj["name"] = object.name;
                        newObj["elements"] = object.elements;
                        return newObj;
                    }),
                    title: title,
                });
            };
        };
    };

    safeJsonParse = (str) => {
        try {
            return [null, JSON.parse(str)];
        } catch (err) {
            return [err];
        };
    };

    getFormatSample = () => {
        this.setState(state => ({
            isSampleOpened: !state.isSampleOpened
        }));
    };
    componentDidUpdate(prevProps, prevState) {
        if (this.state.currentValue !== prevState.currentValue ||
            this.state.goal !== prevState.goal ||
            this.state.title !== prevState.title ||
            this.state.errorMessage !== prevState.errorMessage
        ) {
            this.settingData(this.state.currentValue);
        };
    };

    render() {
        const { currentValue, goal, title, branches, errorMessage, warningMessage, isSampleOpened } = this.state;
        let formField, displayDiagram;
        formField = (<
            JsonFormField
            currentValue={currentValue}
        />);
        if (goal) {
            displayDiagram = <BuildDiagram
                goal={goal}
                title={title}
                branches={branches}
                arrowButtonStyle={arrowButtonStyle}
            />;
        };
        return (
            <div
                className="json"
                style={{
                    backgroundImage: `url(${imgUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'repeat',
                }}>

                <div className="json-form" onChange={this.handleChange()}>
                    <div>
                        <Button variant="contained" style={jsonFormatButtonStyle} color="primary" onClick={() => { this.getFormatSample() }}>
                            {isSampleOpened ? 'hide JSON format' : 'see JSON format'}
                        </Button>
                    </div>
                    <div className="json-form-input">
                        {formField}
                    </div>
                </div>
                <div className="json-container">
                    {this.state.isSampleOpened ? <PopUp getFormatSample={this.getFormatSample} /> : null}
                    <div className="json-error">
                        {errorMessage}
                        &nbsp;
                        {warningMessage}
                    </div>
                    {displayDiagram}
                </div>
            </div>
        );
    };
};
const arrowButtonStyle = {
    fontSize: "10px",
    backgroundColor: "#5b6692",
    color: "whitesmoke",
    border: "none",
};
var jsonFormatButtonStyle = {
    backgroundColor: '#5b6692',
    padding: 0,
    width: '100%',
    height: '35px',
    marginBottom: "0.5em",
    fontFamily: "Computer Modern TypeWriter",
    fontSize: '15px',
    fontWeight: 750,
    color: "whitesmoke"
};
