import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CustomizedMenus from './DropMenu'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#52504f",
        height: "5vh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: "1vw"
    }
}));

export default function ButtonAppBar(props) {
    const classes = useStyles();
    return (
        <AppBar position="static" className={classes.root}>
            <CustomizedMenus setPage={props.setPage} />
        </AppBar>
    );
}

