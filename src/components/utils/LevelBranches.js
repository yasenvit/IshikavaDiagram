import Branch from './Branch';

const LevelBranches = (props, totalBranches, branchObjects, elementsQty, side, goalSpace) => {
    /* function builds branch on upper or bottom side depends of flag "side" */
    const { axisLength } = props;
    let qty = totalBranches < 5 ? elementsQty + 1 : elementsQty;
    const shift = Math.round(axisLength / (qty));
    for (let i = 0; i < branchObjects.length; i++) {
        Branch(props, totalBranches, branchObjects[i], i + 1, shift, side, goalSpace);
    };
};

export default LevelBranches;
