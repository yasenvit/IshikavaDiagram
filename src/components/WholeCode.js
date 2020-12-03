import React, { Component } from 'react'
import DisplayDiagram from './DisplayDiagram'


export default class BuildDiagram extends Component {

    state = {
        title: "Diagram by Vitaliy Yasenivskyy",
        fishboneData: [],
        canvasWidth: 1000,
        canvasHeight: 1000 / 1.4142,
        rightDirAngle: 50,
        leftDirAngle: 130,
        isRightDirection: true,
    }

    toggleHandler = () => {
        this.setState(state => ({ isRightDirection: !state.isRightDirection }));
    };

    componentDidMount() {
        this.getDiagramData(this.props.fishboneData)
        this.getCredential()
    }
    componentWillUnmount(prevProps, prevState) {
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.fishboneData && this.state.fishboneData !== prevState.fishboneData || this.state.isRightDirection !== prevState.isRightDirection) {
            this.buildSpine()
        } else if (this.state.fishboneData && this.state.isRightDirection !== prevState.isRightDirection) {
            this.getCredential()
        }
    }

    getDiagramData = (data) => {
        this.setState({ fishboneData: data })
    }

    getCredential = () => {
        if (this.state.fishboneData) {
            const { rightDirAngle, leftDirAngle, canvasWidth, canvasHeight } = this.state
            let canvas = document.getElementById("myCanvas");
            let angleDegree = this.state.isRightDirection ? rightDirAngle : leftDirAngle
            let angleRadian = this.getRadianFromDegree(angleDegree);
            let axisHeightPosition = canvasHeight / 2
            let axisLength = canvasWidth * 0.75
            let leftEdge = (canvasWidth - axisLength) / 2
            let rightEdge = (canvasWidth - axisLength) / 2
            let topEdge = canvasHeight * 0.1
            let bottomEdge = canvasHeight * 0.1
            this.setState({
                canvas,
                angleRadian,
                axisHeightPosition,
                axisLength,
                leftEdge,
                topEdge,
                rightEdge,
                bottomEdge
            })
        }
    }


    canvasPrint() {
        let oCanvas = document.createElement('canvas').toDataURL
        window.print();
    }
    getRadianFromDegree(deg) {
        /* finding radian from angle degree*/
        let radianAngle = deg * (Math.PI / 180)
        return radianAngle
    }
    buildSpine() {
        /* function builds diagram axis */
        const { canvas, leftEdge, axisHeightPosition, axisLength, fishboneData, canvasWidth, canvasHeight } = this.state
        let spine = canvas.getContext('2d');
        spine.clearRect(0, 0, canvasWidth, canvasHeight)
        spine.beginPath();
        spine.moveTo(leftEdge, axisHeightPosition);
        spine.lineTo(leftEdge + axisLength, axisHeightPosition);
        spine.lineWidth = 3;
        spine.strokeStyle = '#333333';
        spine.stroke();
        this.printGoal(leftEdge, leftEdge + axisLength, axisHeightPosition,)
        this.printTitle()
        if (this.state.fishboneData.methods.length > 1) {
            let upperSideElements = []
            let bottomSideElements = []
            for (let idx = 0; idx < fishboneData.methods.length; idx++) {
                if (idx % 2) {
                    bottomSideElements.push(fishboneData.methods[idx])
                }
                else {
                    upperSideElements.push(fishboneData.methods[idx])
                }
            }
            let pairsQty = Math.max(upperSideElements.length, bottomSideElements.length)
            let upperSide = "upperSide";
            let bottomSide = "bottomSide";

            this.buildOneSideBones(upperSideElements, pairsQty, upperSide)
            this.buildOneSideBones(bottomSideElements, pairsQty, bottomSide)
        }

    }

    printTitle() {
        const { title, canvas, canvasWidth, isRightDirection } = this.state
        let titleText = canvas.getContext('2d');
        titleText.font = "14pt Colibri";
        titleText.fillStyle = '#000000';
        titleText.textBaseline = "hanging";
        titleText.textAlign = isRightDirection ? "end" : "start";
        let x = isRightDirection ? canvasWidth - 10 : 10;
        titleText.fillText(title, x, 10);
    }
    printGoal(xStart, xEnd, y) {
        /* printing main goal */
        const { canvas, fishboneData, isRightDirection, canvasWidth } = this.state
        let goal = fishboneData.goal
        let goalText = canvas.getContext('2d')
        goalText.font = "14pt Spartan"
        goalText.fillStyle = '#003333';
        goalText.textBaseline = "middle";
        goalText.textAlign = isRightDirection ? "start" : "end"
        let x = isRightDirection ? xEnd + 5 : xStart - 5
        let textHeight = goalText.measureText("M").width
        let max_width = isRightDirection ? canvasWidth - xEnd - textHeight : xStart - textHeight
        let text = this.getLines(goalText, goal, max_width, textHeight)
        let textRows = text.length
        text.map((part, idx) => goalText.fillText(
            part, x, y - (textRows - idx - 1) * textHeight
        ))

    }

    buildOneSideBones(branchArray, bonePairs, side) {
        /* function builds branch on upper or bottom side depends of flag "side" */
        const { axisLength } = this.state
        const bone_shift = axisLength / (bonePairs + 1)
        for (let i = 0; i < branchArray.length; i++) {
            this.buildBone(branchArray[i], i + 1, bone_shift, side)
        }
    }

    buildBone(branch, boneIdx, boneShift, level) {
        /* function builds vertical bone */
        const { canvas, canvasWidth, canvasHeight, isRightDirection, axisLength, axisHeightPosition, leftEdge, topEdge, bottomEdge } = this.state
        let bone = canvas.getContext('2d');
        let x_startPoint = isRightDirection ? leftEdge + axisLength - (boneShift * boneIdx) + boneShift * 0.35 : leftEdge + (boneShift * boneIdx) - boneShift * 0.35
        let y_startPoint = axisHeightPosition
        let startPoints = [x_startPoint, y_startPoint]
        let boneHeight = level === "upperSide" ? axisHeightPosition - topEdge : canvasHeight - bottomEdge - axisHeightPosition
        let MaxWidthLeft = x_startPoint - 10
        let MaxWidthRight = canvasWidth - x_startPoint - 10
        let endPoints = this.getCoordsFromHeightAngle(startPoints, boneHeight, MaxWidthLeft, MaxWidthRight, level)
        let [x_endPoint, y_endPoint] = endPoints

        bone.beginPath();
        bone.moveTo(x_startPoint, y_startPoint);
        bone.lineTo(x_endPoint, y_endPoint);
        bone.lineWidth = 1.5;
        bone.strokeStyle = '#333333';
        bone.stroke();
        this.buildPointAndName(boneShift, branch, x_startPoint, x_endPoint, y_startPoint, y_endPoint, level)
        this.printBranchName(branch, level, x_endPoint, y_endPoint)
    }

    getCoordsFromHeightAngle([x, y], height, leftMaxWidth, rightMaxWidth, spineLevel) {
        /* function gives coords of bone end */
        const { isRightDirection, angleRadian } = this.state

        if (isRightDirection) {
            let width = height / Math.tan(angleRadian)
            let max_width = leftMaxWidth
            if (max_width < width) {
                let corrected_height = max_width * Math.tan(angleRadian)
                return [x - max_width, spineLevel === "upperSide" ? y - corrected_height : y + corrected_height]
            }
            return [x - width, spineLevel === "upperSide" ? y - height : y + height]
        }
        else {

            let width = Math.abs(height / Math.tan(3.14159 - angleRadian))
            let max_width = rightMaxWidth
            if (max_width < width) {
                let corrected_height = Math.abs(max_width * Math.tan(3.14159 - angleRadian))
                return [x + max_width, spineLevel === "upperSide" ? y - corrected_height : y + corrected_height]
            }
            return [x + width, spineLevel === "upperSide" ? y - height : y + height]
        }
    }

    buildPointAndName(shift, element, xStart, xEnd, yStart, yEnd, flag) {
        /* set points on given branch */
        const { canvas } = this.state
        let childrenQty = element.children.length
        let hypotenuse = this.getHypotenuse(Math.abs(xEnd - xStart), Math.abs(yEnd - yStart))
        let step = hypotenuse / (childrenQty + 1)
        for (let pos = 1; pos <= childrenQty; pos++) {
            let childHypo = step * pos
            const childPosition = this.getCoordsFromHypoAngle([xStart, yStart], childHypo, flag)
            const [x, y] = childPosition
            let point = canvas.getContext('2d');
            point.beginPath()
            point.arc(x, y, 2, 0, 2 * Math.PI, true);
            point.fillStyle = '#000000';
            point.fill();
            this.buildUnderline(shift, x, y)
            this.printChild(element.children[pos - 1], shift, flag, x, y)
        }
    }

    printBranchName(element, side, xEnd, yEnd) {
        const { canvas } = this.state
        let branchName = element.name
        let nameText = canvas.getContext('2d')
        nameText.font = "12pt Spartan"
        nameText.fillStyle = '#003333';
        nameText.textAlign = "center";
        nameText.textBaseline = side === "upperSide" ? "bottom" : "hanging"
        nameText.fillText(branchName, xEnd, side === "upperSide" ? yEnd - 5 : yEnd + 5)
    }

    getHypotenuse(a, b) {
        return (Math.sqrt((a * a) + (b * b)));
    }

    getCoordsFromHypoAngle([x, y], hypo, flag) {
        const { isRightDirection, angleRadian } = this.state
        let height, width
        if (isRightDirection) {
            height = hypo * Math.sin(angleRadian)
            width = hypo * Math.cos(angleRadian)
        } else {
            height = hypo * Math.sin(3.14159 - angleRadian)
            width = hypo * Math.cos(3.14159 - angleRadian)
        }
        return [x - width, flag === "upperSide" ? y - height : y + height]
    }

    buildUnderline(shift, xStart, yStart) {
        /* prints underline of children*/
        const { canvas, isRightDirection } = this.state
        let underline = canvas.getContext('2d');
        underline.beginPath();
        underline.moveTo(isRightDirection ? xStart + shift / 40 : xStart - shift / 40, yStart);
        underline.lineTo(isRightDirection ? xStart + shift / 1.5 : xStart - shift / 1.5, yStart);
        underline.lineWidth = 0.8;
        underline.strokeStyle = '#333333';
        underline.stroke();
    }

    printChild(child, shift, side, xRaw, yRaw) {
        /* prints children of children*/
        const { canvas, isRightDirection } = this.state
        let childText = canvas.getContext('2d')
        childText.font = "11pt Colibri";
        childText.fillStyle = '#0050A6';
        childText.textBaseline = "bottom"
        childText.textAlign = isRightDirection ? "start" : "end"
        let textHeight = childText.measureText("M").width
        let x = isRightDirection ?
            side === "bottomSide" ? xRaw + textHeight * 1.1 : xRaw + textHeight * 0.2
            : side === "bottomSide" ? xRaw - textHeight * 1.1 : xRaw - textHeight * 0.2
        childText.lineWidth = 1;
        let text = this.getLines(childText, child, shift, textHeight)
        let textRows = text.length
        if (isRightDirection) {
            text.map((part, idx) => childText.fillText(
                part, side === "bottomSide" ? x + (textRows - idx - 1) * textHeight : x - (textRows - idx - 1) * textHeight,
                yRaw + (idx + 1 - textRows) * textHeight
            ))
        } else {
            text.map((part, idx) => childText.fillText(
                part, side === "upperSide" ? x + (textRows - idx - 1) * textHeight : x - (textRows - idx - 1) * textHeight,
                yRaw + (idx + 1 - textRows) * textHeight
            ))
        }
    }

    getLines(ctx, text, maxWidth, text_height) {
        /* wraps the text that longer than max_width into multiple lines */
        var words = text.split(" ");
        var lines = [];
        var currentLine = words[0];

        for (var i = 1; i < words.length; i++) {
            var word = words[i];
            var width = ctx.measureText(currentLine + " " + word).width;
            if (width + text_height < maxWidth) {
                currentLine += " " + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    }

    render() {
        let displayDiagram = (<div> NOTHING TO DISPLAY</div>)
        if (this.state.fishboneData) {
            displayDiagram = (<div className="sample">
                <canvas className="canvas" id="myCanvas" width={this.state.canvasWidth} height={this.state.canvasHeight}></canvas>
            </div>)
        }
        return (
            <div className="diagram-page">
                <div className="buttonsField">
                    <button className="button" onClick={this.canvasPrint}>
                        <span>print</span>
                    </button>
                    <button className="button" onClick={this.toggleHandler} >
                        <span>{this.state.isRightDirection ? "<< left" : "right >>"}</span>
                    </button>

                </div>
                <div>
                    <DisplayDiagram diagram={displayDiagram} />
                </div>

            </div>
        )

    }
}

getBack = () => {
    const { branches, inputFor } = this.state
    let branchName, currentV, lastBranchElements
    if (inputFor === "Enter Element") {
        if (branches.length > 1) {
            lastBranchElements = branches[branches.length - 1].elements
            if (lastBranchElements.length > 0) {
                lastBranchElements.pop()
                branchName = branches[branches.length - 1].name
            } else {
                branches.pop()
                branchName = branches[branches.length - 2].name
            }
        }
    }
    this.setState({
        branches: branches,
        branchName: branchName,
        currentValue: "different"
    })
}

