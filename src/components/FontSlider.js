import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        width: 40 + theme.spacing(3) * 2,
        color: '#333333',
        textAlign: "center",
        fontFamily: "Computer Modern Typewriter",
    },
    margin: {
        height: theme.spacing(3),
    },
});

const ChangeFontSlider = withStyles({
    root: {
        color: "#52504f",
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
        backgroundColor: "#52504f"
    },
    rail: {
        height: 8,
        borderRadius: 4,
        backgroundColor: "#52504f"
    },
})(Slider);

class FontSlider extends Component {
    state = {
        font: 5
    }
    handleChange = (event, newValue) => {
        event.preventDefault();
        this.setState({ font: newValue });
        this.props.getFontSize(newValue);
    };
    getCurrentFont = (font) => {
        this.setState({
            font: font
        });
    };
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.childOptimalFontSize !== this.props.childOptimalFontSize) {
            this.getCurrentFont(this.props.childOptimalFontSize);
        };
    };
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.margin} />
                <ChangeFontSlider
                    valueLabelDisplay="auto"
                    value={this.state.font}
                    onChange={this.handleChange}
                    min={5}
                    max={15}
                    step={0.5}
                />
                <Typography gutterBottom>Font size</Typography>
            </div>
        )
    }
}
export default withStyles(styles)(FontSlider);
