
const PrintTitle = (props) => {
    const { title, canvas, canvasWidth, isRightDirection, titleFont, titleColor } = props;
    let titleText = canvas.getContext('2d');
    titleText.lineWidth = 1.5;
    titleText.font = titleFont;
    titleText.fillStyle = titleColor;
    titleText.textBaseline = "hanging";
    titleText.textAlign = isRightDirection ? "end" : "start";
    let x = isRightDirection ? canvasWidth - 20 : 20;
    titleText.fillText(title, x, 20);
};

export default PrintTitle;
