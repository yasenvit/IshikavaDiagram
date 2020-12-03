
import PrintChild from './PrintChild';
import ChildUnderline from './ChildUnderline';

const PointAndName = (props, shift, elements, idx, xStart, xEnd, yStart, yEnd, side, goalSpace) => {
    /* set points on given branch */
    const { canvas, isRightDirection, angleRadian, lineColor } = props;
    let childrenQty = elements.length;
    let hypotenuse = getHypotenuse(Math.abs(xEnd - xStart), Math.abs(yEnd - yStart));
    let step = idx === 1 ? (hypotenuse - goalSpace) / (childrenQty + 1) : hypotenuse / (childrenQty + 1);
    for (let pos = 1; pos <= childrenQty; pos++) {
        //if it's first branch - it will leave some space for goal text and start it's child shifted
        let childHypo = idx === 1 ? goalSpace + step * pos : step * pos;
        const childPosition = getCoordsFromHypoAngle(isRightDirection, angleRadian, [xStart, yStart], childHypo, side);
        const [x, y] = childPosition;
        let point = canvas.getContext('2d');
        point.beginPath();
        point.arc(x, y, 1, 0, 1 * Math.PI, true);
        point.fillStyle = lineColor;
        point.fill();
        let textCred = PrintChild(props, childrenQty, elements[pos - 1], shift, side, x, y + 0.5);
        ChildUnderline(props, side, shift, x, y + 0.5, textCred);
    };
};

const getHypotenuse = (a, b) => {
    return (Math.sqrt((a * a) + (b * b)));
}

const getCoordsFromHypoAngle = (isRightDirection, angleRadian, [x, y], hypo, side) => {
    let height, width;
    if (isRightDirection) {
        height = hypo * Math.sin(angleRadian);
        width = hypo * Math.cos(angleRadian);
    } else {
        height = hypo * Math.sin(3.14159 - angleRadian);
        width = hypo * Math.cos(3.14159 - angleRadian);
    };
    return [Math.round(x - width), side === "upperSide" ? Math.round(y - height) : Math.round(y + height)];
};

export default PointAndName;
