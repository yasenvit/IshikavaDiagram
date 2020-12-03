import React from 'react';
import Button from '@material-ui/core/Button';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import { useArrowDarkButtonStyles } from '@mui-treasury/styles/button/arrowDark';
import PrintIcon from '@material-ui/icons/Print';

const ArrowDarkButton = (props) => {
    const { branches, isRightDirection, toggleHandler, printCanvas, getSorted, sorted, arrowButtonStyle } = props;
    const classes = useArrowDarkButtonStyles({
        root: {
            backgroundColor: '#BDCDEF'
        }
    }
    );

    let sortingSymbol = sorted === "unsorted" ? "descend" : sorted === "descend" ? "ascend" : "unsorted";
    return (
        <div className="buttons-mui">
            <Button
                classes={classes}
                onClick={printCanvas}
                color="primary"
                style={arrowButtonStyle}
            >
                <PrintIcon />
            </Button>
            <Button
                classes={classes}
                onClick={toggleHandler}
                color="primary"
                style={arrowButtonStyle}
            >
                {isRightDirection ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
            <Button
                classes={classes}
                onClick={() => { getSorted(sortingSymbol, branches) }}
                color="primary"
                size="small"
                style={arrowButtonStyle}
            >
                {sorted === "unsorted" ? <KeyboardArrowUp /> : sorted === "descend" ? <KeyboardArrowDown /> : "reset"}
            </Button>
        </div>
    );
};


export default ArrowDarkButton;

