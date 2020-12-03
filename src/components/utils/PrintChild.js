import SplitText from './SplitText';

const PrintChild = (props, childrenQty, child, shift, side, xRaw, yRaw) => {
    /* prints child name */
    const { canvas, isRightDirection, childFontSize, childColor } = props;
    let fontAdjustment = 1;
    if (childrenQty > 14) {
        fontAdjustment = 0.75;
    } else if (childrenQty > 10) {
        fontAdjustment = 0.85;
    } else if (childrenQty > 6) {
        fontAdjustment = 0.9;
    };
    let font = childFontSize * fontAdjustment;
    let childText = canvas.getContext('2d');
    childText.font = `${font}pt Helvetica`;
    childText.fillStyle = childColor;
    childText.textBaseline = "bottom";
    childText.textAlign = isRightDirection ? "start" : "end";
    let textHeight = childText.measureText("M").width;
    let x = isRightDirection ?
        side === "bottomSide" ? xRaw + textHeight * 0.8 : xRaw + textHeight * 0.2
        : side === "bottomSide" ? xRaw - textHeight * 0.8 : xRaw - textHeight * 0.2;
    childText.lineWidth = 0.7;
    let text = SplitText(childText, child, shift, textHeight);
    let textRows = text.text.length;
    if (isRightDirection) {
        text.text.map((part, idx) => childText.fillText(
            part, side === "bottomSide" ? Math.round(x + (textRows - idx - 1) * textHeight * 0.6) : Math.round(x - (textRows - idx - 1) * textHeight * 0.6),
            Math.round(yRaw + (idx + 1 - textRows) * textHeight)
        ));
    } else {
        text.text.map((part, idx) => childText.fillText(
            part, side === "upperSide" ? Math.round(x + (textRows - idx - 1) * textHeight * 0.6) : Math.round(x - (textRows - idx - 1) * textHeight * 0.6),
            Math.round(yRaw + (idx + 1 - textRows) * textHeight)
        ));
    };
    return { textLength: text.maxLength, textHeight: textHeight };
};

export default PrintChild;
