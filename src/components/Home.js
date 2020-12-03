import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import GetSample from './GetSample'

export default class Home extends Component {
    render() {
        let buttons = (
            <div className="home-buttons">
                <Button
                    style={formButtonStyle}
                    variant="text"
                    size="medium"
                    color="primary"
                    onClick={(e) => { this.props.setPage("manual") }}
                >
                    Create manually
                </Button>
                <Button
                    style={formButtonStyle}
                    variant="text"
                    size="medium"
                    color="primary"
                    onClick={() => { this.props.setPage("json"); }}
                >
                    JSON Creation
                </Button>
            </div>
        )
        return (
            <div className="home">
                <div className="text">
                    <div>
                        <h4>FISHBONE DIAGRAM</h4>
                    </div>
                    <div className="text-box">
                        Also called: cause-and-effect diagram, Ishikawa diagram.<br></br>
                        This cause analysis tool is considered one of the seven basic quality tools.
                        The fishbone diagram identifies many possible causes for an effect or problem.
                        It can be used to structure a brainstorming session.
                        It immediately sorts ideas into useful categories.
                    </div>
                    <h5>WHEN TO USE A FISHBONE DIAGRAM</h5>

                    <ul>
                        <li>When identifying possible causes for a problem</li>
                        <li>When a team’s thinking tends to fall into ruts</li>
                    </ul>

                </div>
                <h5>LETS GET STARTED</h5>
                {buttons}

                <div className="home-display">
                    <GetSample arrowButtonStyle={arrowButtonStyle} />
                </div>


            </div>
        );
    };
};

var formButtonStyle = {
    maxWidth: '250px',
    maxHeight: '150px',
    minWidth: '250px',
    minHeight: '40px',
    padding: '0px',
    margin: '2px',
    fontFamily: "Computer Modern Bright",
    fontSize: '12px',
    fontWeight: 700,
    borderColor: '#3996CE',
    color: 'whitesmoke',
    backgroundColor: "#5b6692",
    opacity: "0.8"
};

const arrowButtonStyle = {
    fontSize: "10px",
    backgroundColor: "#AAC8B4",
    color: "#5b6692",
    border: "blue",
};
