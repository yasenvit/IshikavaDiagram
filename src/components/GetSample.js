import React, { Component, Fragment } from 'react';
import SampleData from './SampleData';
import BuildDiagram from './BuildDiagram';

export default class GetSample extends Component {
    state = {
        goal: "your goal",
        branches: [],
        title: "your title"
    }
    getData = (props) => {
        let goal = Object.keys(props)[0];
        let branches = props[goal].map(object => {
            let key = Object.keys(object)[0];
            let newObj = {};
            newObj["name"] = key;
            newObj["elements"] = object[key];
            return newObj;
        });
        this.setState({
            goal: goal,
            branches: branches,
            title: "Created by",
            mode: "sample",
            isCreating: false
        })
    }
    componentDidMount() {
        this.getData(SampleData);
    };
    render() {
        const { title, goal, branches } = this.state;
        let buildCanvas = <BuildDiagram
            title={title}
            goal={goal}
            branches={branches}
            arrowButtonStyle={this.props.arrowButtonStyle}
        />;
        return (
            <Fragment>
                {buildCanvas}
            </Fragment>
        );
    };
};
