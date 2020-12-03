const BranchName = (props, name, side, xEnd, yEnd) => {
    const { canvas, branchFontSize, branchColor, isRightDirection } = props;
    let branchName = name;
    let textName = canvas.getContext('2d');
    let textShift = Math.round(textName.measureText(branchName).width / 3);
    textName.lineWidth = 2;
    textName.font = `${branchFontSize}pt Helvetica`;
    textName.fillStyle = branchColor;
    textName.textAlign = isRightDirection ? "start" : "end";
    textName.textBaseline = side === "upperSide" ? "bottom" : "hanging";
    textName.fillText(branchName, isRightDirection ? xEnd - textShift : xEnd + textShift, side === "upperSide" ? yEnd - 5 : yEnd + 5);
};

export default BranchName;
