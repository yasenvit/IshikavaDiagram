import SplitText from "./SplitText";

const PrintGoal = (props, xStart, xEnd, y) => {
    /* printing main goal */
    const { canvas, isRightDirection, canvasWidth, goalFontSize, goalColor, goal } = props;
    let goalText = canvas.getContext('2d');
    goalText.lineWidth = 2;
    goalText.font = `${goalFontSize}pt Helvetica`;
    goalText.fillStyle = goalColor;
    goalText.textBaseline = "hanging";
    goalText.textAlign = isRightDirection ? "start" : "end";
    let x = isRightDirection ? xEnd + 5 : xStart - 5;
    let textHeight = Math.round(goalText.measureText("M").width);
    let max_width = isRightDirection ? canvasWidth - xEnd - textHeight : xStart - textHeight;
    let text = SplitText(goalText, goal, max_width, textHeight).text;
    let textRows = text.length;
    // finding y position (top) for goal text
    let y_Position = y - Math.round((textRows * textHeight) / 2);
    text.map((part, idx) => goalText.fillText(
        part, x, y_Position + textHeight * (idx))
    );
    return { goalSpace: textRows * textHeight / 2 };
};
export default PrintGoal;
