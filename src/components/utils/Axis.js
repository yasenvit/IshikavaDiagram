import PrintGoal from './PrintGoal';
import LevelBranches from './LevelBranches';
import PrintTitle from './PrintTitle';

const Axis = (props) => {
    /* function builds diagram axis */
    const { canvas, goal, leftEdge, axisHeightPosition, axisLength, canvasWidth, canvasHeight, branches } = props;
    let axis = canvas.getContext('2d');
    axis.clearRect(0, 0, canvasWidth, canvasHeight);
    if (goal) {
        axis.beginPath();
        axis.moveTo(leftEdge, axisHeightPosition);
        axis.lineTo(leftEdge + axisLength, axisHeightPosition);
        axis.lineWidth = 2;
        axis.strokeStyle = '#333333';
        axis.stroke();
        let goalSpace = PrintGoal(props, leftEdge, leftEdge + axisLength, axisHeightPosition,).goalSpace;
        PrintTitle(props);
        if (branches && branches.length > 0) {
            let upperSideObjects = [];
            let bottomSideObjects = [];
            for (let idx = 0; idx < branches.length; idx++) {
                if (idx % 2) {
                    bottomSideObjects.push(branches[idx]);
                } else {
                    upperSideObjects.push(branches[idx]);
                };
            };
            let pairsQty = Math.max(upperSideObjects.length, bottomSideObjects.length);
            let upperSide = "upperSide";
            let bottomSide = "bottomSide";
            LevelBranches(props, branches.length, upperSideObjects, pairsQty, upperSide, goalSpace);
            LevelBranches(props, branches.length, bottomSideObjects, pairsQty, bottomSide, goalSpace);
        };
    };
};

export default Axis;
