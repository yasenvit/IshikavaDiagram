import React, { Component } from "react";
import JsonSample from './JsonSample';


export default class PopUp extends Component {
    handleClick = () => {
        this.props.getFormatSample();
    };
    render() {
        return (
            <div className="modal">
                <div className="modal_content">
                    <span className="close" onClick={this.handleClick}>&times;    </span>
                    <JsonSample />
                </div>
            </div>
        );
    }
}
