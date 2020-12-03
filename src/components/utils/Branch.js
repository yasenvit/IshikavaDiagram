import PointAndName from './PointAndName';
import BranchName from './BranchName';

const Branch = (props, totalBranches, branch, idx, shift, side, goalSpace) => {
    /* function builds vertical bone */
    const { canvas, canvasWidth, canvasHeight, isRightDirection, axisLength, axisHeightPosition, leftEdge, topEdge, bottomEdge, angleRadian, lineColor, branchFontSize } = props;
    let branchName = branch.name;
    let branchElements = branch.elements;
    let bone = canvas.getContext('2d');
    bone.font = branchFontSize;
    bone.fillStyle = lineColor;
    // shifting first branch closer to goal depends how many branches total in order to give more space for branches
    let firstBranchShiftIndex = totalBranches > 10 ? 0.8 : totalBranches > 8 ? 0.7 : totalBranches > 6 ? 0.6 : totalBranches > 4 ? 0.4 : 0;
    let xStart = isRightDirection ?
        Math.round(leftEdge + axisLength - (shift * idx) + shift * firstBranchShiftIndex) + 0.5 :  // changing length btw goal and first branch
        Math.round(leftEdge + (shift * idx) - shift * firstBranchShiftIndex) + 0.5;                   // changing length btw goal and first branch
    let yStart = axisHeightPosition;
    let startPoints = [xStart, yStart];
    // measure approx branchName height
    let textHeight = bone.measureText("M").width;
    // if more than 10 branches, making even branches longer in order to fit
    let height;
    if (totalBranches > 10) {
        let heightShift = idx % 2 === 0 ? textHeight : 0;
        height = side === "upperSide" ? axisHeightPosition - topEdge + 0.5 + heightShift : canvasHeight - bottomEdge - axisHeightPosition + 0.5 + heightShift;
    } else {
        height = side === "upperSide" ? axisHeightPosition - topEdge + 0.5 : canvasHeight - bottomEdge - axisHeightPosition + 0.5;
    };
    let maxWidthLeft = xStart - 10;
    let maxWidthRight = canvasWidth - xStart - 10;
    let endPoints = getCoordsFromHeightAngle(isRightDirection, angleRadian, startPoints, height, maxWidthLeft, maxWidthRight, side);
    let [xEnd, yEnd] = endPoints;
    bone.beginPath();
    bone.moveTo(xStart, yStart);
    bone.lineTo(xEnd, yEnd);
    bone.lineWidth = 0.8;
    bone.stroke();
    PointAndName(props, shift, branchElements, idx, xStart, xEnd, yStart, yEnd, side, goalSpace);
    BranchName(props, branchName, side, xEnd, yEnd);
};
const getCoordsFromHeightAngle = (isRightDirection, angleRadian, [x, y], height, leftMaxWidth, rightMaxWidth, spineLevel) => {
    /* function gives coords of bone end */
    if (isRightDirection) {
        let width = Math.round(height / Math.tan(angleRadian));
        let maxWidth = leftMaxWidth;
        if (maxWidth < width) {
            let refinedHeight = Math.round(maxWidth * Math.tan(angleRadian));
            return [x - maxWidth + 0.5, spineLevel === "upperSide" ? y - refinedHeight + 0.5 : y + refinedHeight + 0.5];
        };
        return [x - width + 0.5, spineLevel === "upperSide" ? y - height + 0.5 : y + height + 0.5];
    } else {
        let width = Math.round(Math.abs(height / Math.tan(3.14159 - angleRadian)));
        let maxWidth = rightMaxWidth;
        if (maxWidth < width) {
            let refinedHeight = Math.round(Math.abs(maxWidth * Math.tan(3.14159 - angleRadian)));
            return [x + maxWidth + 0.5, spineLevel === "upperSide" ? y - refinedHeight + 0.5 : y + refinedHeight + 0.5];
        };
        return [x + width + 0.5, spineLevel === "upperSide" ? y - height + 0.5 : y + height + 0.5];
    };
};

export default Branch;
