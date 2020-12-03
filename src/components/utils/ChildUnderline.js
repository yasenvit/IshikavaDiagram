const ChildUnderline = (props, side, shift, xStart, yStart, textCred) => {
    /* builds line under child name*/
    const { canvas, isRightDirection, lineColor } = props;
    let bottomUnderlines = Math.round(textCred.textLength + textCred.textHeight * 0.6);
    let lineLength = side === "bottomSide" ? bottomUnderlines < Math.round(shift * 0.9) ? bottomUnderlines : Math.round(shift * 0.9) : textCred.textLength;
    let underline = canvas.getContext('2d');
    underline.beginPath();
    underline.moveTo(isRightDirection ? Math.round(xStart + shift / 40) : Math.round(xStart - shift / 40), yStart);
    underline.lineTo(isRightDirection ? Math.round(xStart + lineLength) : Math.round(xStart - lineLength), yStart);
    underline.lineWidth = 0.6;
    underline.strokeStyle = lineColor;
    underline.stroke();
};

export default ChildUnderline;
