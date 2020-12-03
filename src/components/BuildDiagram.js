import React, { Component } from 'react';
import DisplayDiagram from './DisplayDiagram';
import Axis from './utils/Axis';
import ArrowButton from './ArrowButton';
import GetOptimalFontSize from './utils/GetOptimalFontSize';
import FontSlider from './FontSlider';

const preferableCanvasHeight = window.screen.height * 0.8;
const preferableCanvasWidth = Math.round(preferableCanvasHeight * 1.4142);

export default class BuildDiagram extends Component {
    state = {
        title: "",
        goal: "",
        currentValue: "",
        previousValue: "",
        branches: [],
        originBranches: [],
        sorted: "unsorted",
        canvasWidth: preferableCanvasWidth,
        canvasHeight: preferableCanvasHeight,
        axisIdx: 0.75,
        rightAngle: 60,
        leftAngle: 120,
        isRightDirection: true,
        titleColor: '#333333',
        lineColor: "rgb(17,33,54)",
        childColor: " #A41404",
        branchColor: '#4A090D',
        goalColor: "#4A090D",
        titleFont: "Italic 14pt Helvetica",
        childFontSize: "",
        branchFontSize: "",
        goalFontSize: "",
    };

    printCanvas = () => {
        const dataUrl = document.getElementById('myCanvas').toDataURL();
        let windowContent = '<!DOCTYPE html>';
        windowContent += '<html>';
        windowContent += '<head><title>Print canvas</title></head>';
        windowContent += '<body>';
        windowContent += '<img src="' + dataUrl + '">';
        windowContent += '</body>';
        windowContent += '</html>';
        const printWin = window.open('', '', `'width=''width=440,height=260'`);
        printWin.document.open();
        printWin.document.write(windowContent);
        printWin.document.addEventListener('load', function () {
            printWin.focus();
            printWin.print();
            printWin.document.close();
            printWin.close();
        }, true);
    };

    getCredential = () => {
        const { rightAngle, leftAngle, canvasWidth, canvasHeight, axisIdx, isRightDirection } = this.state;
        let canvas = document.getElementById("myCanvas");
        let angleDegree = this.state.isRightDirection ? rightAngle : leftAngle;
        let angleRadian = this.getRadianFromDegree(angleDegree);
        let axisHeightPosition = Math.round(canvasHeight / 2) + 0.5;
        let axisLength = Math.round(canvasWidth * axisIdx) - 50;
        let leftEdge = isRightDirection ? Math.round((canvasWidth - axisLength) / 2)
            : Math.round((canvasWidth - axisLength) / 2);
        let rightEdge = isRightDirection ? Math.round((canvasWidth - axisLength) / 2)
            : Math.round((canvasWidth - axisLength) / 2);
        let topEdge = Math.round(canvasHeight * 0.08);
        let bottomEdge = Math.round(canvasHeight * 0.08);

        this.setState({
            canvas,
            angleRadian,
            axisHeightPosition,
            axisLength,
            leftEdge,
            topEdge,
            rightEdge,
            bottomEdge
        });
    };

    getFontSize = (size) => {
        this.setState({
            childFontSize: size,
            branchFontSize: size + 2,
            goalFontSize: size + 4
        });
    };

    toggleHandler = () => {
        this.setState(state => ({ isRightDirection: !state.isRightDirection }));
    };

    componentDidMount() {
        this.getCredential();
    };

    getSorted = (dir, arr) => {
        if (dir === "ascend") {
            this.setState({
                branches: arr.sort((a, b) => a.elements.length - b.elements.length),
                sorted: dir
            });
        } else if (dir === "descend") {

            this.setState({
                branches: arr.sort((a, b) => b.elements.length - a.elements.length),
                sorted: dir
            });
        } else if (dir === "unsorted") {
            this.setState({
                branches: this.state.originBranches.map(object => {
                    let newObj = {};
                    newObj["name"] = object.name;
                    newObj["elements"] = object.elements;
                    return newObj;
                }),
                sorted: dir
            });
        };
    };

    getOriginBranches = (data) => {
        this.setState({
            originBranches: data.map(object => {
                let newObj = {};
                newObj["name"] = object.name;
                newObj["elements"] = object.elements;
                return newObj;
            })
        });
    };

    settingData(obj) {
        this.setState({
            goal: obj.goal,
            branches: obj.branches.map(object => {
                let newObj = {};
                newObj["name"] = object.name;
                newObj["elements"] = object.elements;
                return newObj;
            }),
            title: obj.title,
            currentValue: obj.currentValue,
            previousValue: obj.previousValue,
        });
    };

    getRadianFromDegree(deg) {
        /* finding radian from angle degree*/
        let radianAngle = deg * (Math.PI / 180);
        return radianAngle;
    }
    getOptimalFontSize = (arr) => {
        if (arr) {
            const { goalFontSize, branchFontSize, childFontSize } = GetOptimalFontSize(arr);
            this.setState({
                goalFontSize: goalFontSize,
                goalOptimalFontSize: goalFontSize,
                branchFontSize: branchFontSize,
                branchOptimalFontSize: branchFontSize,
                childFontSize: childFontSize,
                childOptimalFontSize: childFontSize
            });
        };
    };

    componentDidUpdate(prevProps, prevState) {
        const { branches, goal, title, previousValue } = this.props;
        if (goal !== prevProps.goal ||
            title !== prevState.title ||
            branches !== prevProps.branches ||
            previousValue !== prevProps.previousValue
        ) {
            this.getOriginBranches(this.props.branches)
            this.settingData(this.props)
            this.getOptimalFontSize(this.props.branches)
        };
        if (this.state.branches !== prevState.branches ||
            this.state.goal !== prevState.goal ||
            this.state.title !== prevState.title ||
            this.state.isRightDirection !== prevState.isRightDirection ||
            this.state.childFontSize !== prevState.childFontSize ||
            this.state.sorted !== prevState.sorted ||
            this.state.previousValue !== prevState.previousValue ||
            this.state.childFontSize !== prevState.childFontSize
        ) {
            Axis(this.state)
        };
    };

    render() {
        const { canvasWidth, canvasHeight, isRightDirection, branches, sorted } = this.state;
        let displayDiagram;

        displayDiagram = (
            <canvas className="canvas" id="myCanvas" width={canvasWidth} height={canvasHeight}></canvas>
        );

        return (
            <div className="build">
                <div className="build-display">
                    <DisplayDiagram diagram={displayDiagram} />
                </div>
                <div className="build-buttons">
                    <ArrowButton
                        toggleHandler={this.toggleHandler}
                        isRightDirection={isRightDirection}
                        printCanvas={this.printCanvas}
                        getSorted={this.getSorted}
                        branches={branches}
                        sorted={sorted}
                        arrowButtonStyle={this.props.arrowButtonStyle}

                    />
                    <FontSlider
                        childOptimalFontSize={this.state.childOptimalFontSize}
                        getFontSize={this.getFontSize}
                    />
                </div>
            </div>
        );
    };
};

