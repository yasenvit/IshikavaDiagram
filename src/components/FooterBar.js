import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#52504f",
        height: "5vh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        color: "rgb(214, 202, 202)"
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function FooterBar(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>

            Created by <span className="footer-span">&nbsp;<a className="footer-span" href="https://www.linkedin.com/in/yasenvit/"> Vitaliy Yasenivskyy </a>&nbsp;</span> © 2020 New York

        </div>
    );
}
