import React, { Component } from 'react';
import BuildDiagram from './BuildDiagram';
import Button from '@material-ui/core/Button';
import ManualFormField from './ManualFormField';
import imgUrl from '../images/bg-pattern.jpg';

export default class GetManualData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputFor: "",
            currentValue: "",
            previousValue: "",
            isCreating: false,
            branches: []
        };
        this.keyPress = this.keyPress.bind(this);
    };

    completeElement = () => {
        this.setState({ inputFor: "Enter Branch" });
    };

    addTitle = () => {
        this.setState({ inputFor: "Title (optional)" });
    }

    handleChange = () => ({ target: { value } }) => {
        this.setState({
            currentValue: value
        });
    };

    getCreatedManually = () => {
        this.setState(state => ({
            title: "",
            goal: "",
            branches: [],
            isCreating: true,
            inputFor: "Enter Goal"
        }));
    };

    keyPress(e) {
        if (e.keyCode === 13) {
            console.log('value', e.target.value);
            this.getInput(this.state.inputFor);
        };
    };

    getInput = name => {
        const { currentValue, branches } = this.state
        if (currentValue === "" && name !== "Title (optional)") {
            alert("Empty input isn't allowed")
        } else {
            if (name === "Enter Goal") {
                this.setState({
                    goal: currentValue,
                    currentValue: "",
                    inputFor: "Enter Branch",
                })
            } else if (name === "Enter Branch") {
                this.setState(prevState => ({
                    branches: [...prevState.branches, { name: currentValue, elements: [] }],
                    branchName: currentValue,
                    inputFor: "Enter Element",
                    currentValue: "",
                }))
            } else if (name === "Enter Element") {
                branches[branches.length - 1].elements.push(currentValue);
                this.setState({
                    branches: branches.map(object => {
                        let newObj = {};
                        newObj["name"] = object.name;
                        newObj["elements"] = object.elements;
                        return newObj;
                    }),
                    currentValue: ""
                })
            } else if (name === "Title (optional)") {
                this.setState(state => ({
                    title: currentValue,
                    currentValue: "",
                    inputFor: "",
                }))
            };
        };
    };

    getBack = () => {
        const { branches, inputFor, goal } = this.state;
        let nextGoal = goal;
        let lastBranch, poppedElement, lastBranchElements, lastBranchElementsLength, nextInputFor;
        if (inputFor === "Enter Goal") {
            this.setState({
                inputFor: "",
                currentValue: "",
                previousValue: "",
                isCreating: false,
            })
        } else if ((inputFor === "Enter Branch" && branches.length > 0) || inputFor === "Title (optional)") {
            this.setState({ inputFor: "Enter Element" })
        } else {
            if (branches.length > 1) {
                lastBranchElements = branches[branches.length - 1].elements;
                lastBranchElementsLength = lastBranchElements.length;
                if (lastBranchElementsLength > 0) {
                    poppedElement = lastBranchElements[lastBranchElementsLength - 1];
                    lastBranch = branches[branches.length - 1].name;
                    lastBranchElements.pop();
                    nextInputFor = "Enter Element";
                } else {
                    poppedElement = branches[branches.length - 1].name;
                    lastBranch = branches[branches.length - 2].name;
                    branches.pop();
                    nextInputFor = "Enter Branch";
                }
            } else if (branches.length === 1) {
                lastBranchElements = branches[branches.length - 1].elements;
                lastBranchElementsLength = lastBranchElements.length;
                if (lastBranchElementsLength > 0) {
                    poppedElement = lastBranchElements[lastBranchElementsLength - 1];
                    lastBranch = branches[branches.length - 1].name;
                    lastBranchElements.pop();
                    nextInputFor = "Enter Element";
                } else {
                    poppedElement = branches[branches.length - 1].name;
                    lastBranch = "";
                    branches.pop();
                    nextInputFor = "Enter Branch";
                }
            } else if (branches.length === 0) {
                nextGoal = "";
                nextInputFor = "Enter Goal";
            };
            this.setState({
                goal: nextGoal,
                branches: branches,
                currentValue: "",
                branchName: lastBranch,
                inputFor: nextInputFor,
                previousValue: poppedElement
            });
        };
    };

    render() {
        const { title, goal, branches, currentValue, inputFor,
            isCreating, branchName, previousValue } = this.state;
        let manualCreationButton, formField, buildCanvas, backButton;
        if (!inputFor) {
            manualCreationButton = (
                <div className="site">
                    <Button
                        variant="text"
                        style={formButtonStyle}
                        color="primary"
                        onClick={() => { this.getCreatedManually() }}
                    >
                        get started
                    </Button>
                </div >
            );
        };

        buildCanvas = <BuildDiagram
            title={title}
            goal={goal}
            branches={branches}
            previousValue={previousValue}
            arrowButtonStyle={arrowButtonStyle}
        />

        if (isCreating && inputFor) {
            backButton = (
                <div className="site">
                    <Button
                        variant="text"
                        style={formButtonStyle}
                        color="primary"
                        onClick={() => { this.getBack() }}
                    >
                        back
                    </Button>
                </div>
            );
        };
        formField = (<ManualFormField
            goal={goal} branches={branches}
            currentValue={currentValue}
            inputFor={inputFor}
            title={title}
            getInput={this.getInput}
            completeElement={this.completeElement}
            isCreating={isCreating}
            addTitle={this.addTitle}
            branchName={branchName}
            keyPress={this.keyPress}
        />);

        return (
            <div
                className="create"
                style={{
                    backgroundImage: `url(${imgUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                }}>

                <div className="create-form">
                    <div className="create-form-objects" onChange={this.handleChange(inputFor)}>
                        {backButton}
                        {manualCreationButton}
                        {formField}
                    </div>
                </div>

                <div className="create-container">
                    {buildCanvas}
                </div>
            </div>
        );
    };
};

var formButtonStyle = {
    maxWidth: '200px',
    maxHeight: '150px',
    minWidth: '200px',
    minHeight: '40px',
    padding: '0px',
    margin: '0px',
    fontFamily: "Computer Modern TypeWriter",
    fontSize: '15px',
    fontWeight: 750,
    borderWidth: '1.6px',
    backgroundColor: '#5b6692',
    color: "whitesmoke"
};

const arrowButtonStyle = {
    fontSize: "10px",
    backgroundColor: '#5b6692',
    color: 'whitesmoke',
    border: "none"
};
