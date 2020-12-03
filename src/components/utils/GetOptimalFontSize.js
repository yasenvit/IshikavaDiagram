const GetOptimalFontSize = (props) => {
    //finding optimal font size
    const xLargeScale = {
        childFontSize: 8,
        branchFontSize: 10,
        goalFontSize: 12,
    };
    const largeScale = {
        childFontSize: 9,
        branchFontSize: 11,
        goalFontSize: 13,
    };
    const middleScale = {
        childFontSize: 10,
        branchFontSize: 12,
        goalFontSize: 14,
    };
    const smallScale = {
        childFontSize: 11,
        branchFontSize: 13,
        goalFontSize: 15,
    };

    let branchesQty = props.length;
    if (branchesQty > 16) {
        return {
            goalFontSize: xLargeScale.goalFontSize,
            branchFontSize: xLargeScale.branchFontSize,
            childFontSize: xLargeScale.childFontSize
        };
    } else if (branchesQty > 8) {
        return {
            goalFontSize: largeScale.goalFontSize,
            branchFontSize: largeScale.branchFontSize,
            childFontSize: largeScale.childFontSize
        };
    } else if (branchesQty > 6) {
        return {
            goalFontSize: middleScale.goalFontSize,
            branchFontSize: middleScale.branchFontSize,
            childFontSize: middleScale.childFontSize
        };
    } else {
        return {
            goalFontSize: smallScale.goalFontSize,
            branchFontSize: smallScale.branchFontSize,
            childFontSize: smallScale.childFontSize
        };
    };
};

export default GetOptimalFontSize;
