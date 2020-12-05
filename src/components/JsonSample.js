import React, { Component } from 'react';

export default class JsonSample extends Component {
    render() {
        let curlyBracketsOpen = "{";
        let curlyBracketsClose = "}";
        let squareBracketOpen = "[";
        let squareBracketClose = "]";
        let colon = ":";
        let comma = ",";
        let quotes = '"';
        let tab = <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>;
        return (
            <div className="json-sample" >
                <h4 style={{ color: "#52504f" }}>JSON format</h4>
                <div className="inner">

                    <p className="json-sample-p"><span className="json-sample-curly-brackets">{curlyBracketsOpen}</span></p>
                    <p className="json-sample-p">{tab}<span className="json-sample-punctuation-marks">{quotes}</span>goal<span className="json-sample-punctuation-marks">{quotes}</span>&nbsp;<span className="json-sample-punctuation-marks">{colon}</span>&nbsp;<span className="json-sample-punctuation-marks">{quotes}</span><span className="json-sample-span">your goal</span><span className="json-sample-punctuation-marks">{quotes}</span>&nbsp;<span className="json-sample-punctuation-marks">{comma}</span></p>
                    <p className="json-sample-p">{tab}<span className="json-sample-punctuation-marks">{quotes}</span>title<span className="json-sample-punctuation-marks">{quotes}</span>&nbsp;<span className="json-sample-punctuation-marks">{colon}</span>&nbsp;<span className="json-sample-punctuation-marks">{quotes}</span><span className="json-sample-span">your title</span><span className="json-sample-punctuation-marks">{quotes}</span>&nbsp;<span className="json-sample-punctuation-marks">{comma}</span></p>
                    <p className="json-sample-p">{tab}<span className="json-sample-punctuation-marks">{quotes}</span>branches<span className="json-sample-punctuation-marks">{quotes}</span>&nbsp;<span className="json-sample-punctuation-marks">{colon}</span>&nbsp;<span className="json-sample-square-brackets">{squareBracketOpen}</span></p>
                    <p className="json-sample-p">{tab}{tab}<span className="json-sample-curly-brackets">{curlyBracketsOpen}</span></p>
                    <p className="json-sample-p">{tab}{tab}{tab}<span className="json-sample-punctuation-marks">{quotes}</span>name<span className="json-sample-punctuation-marks">{quotes}</span>&nbsp;<span className="json-sample-punctuation-marks">{colon}</span>&nbsp;<span className="json-sample-punctuation-marks">{quotes}</span><span className="json-sample-span">branch#1 name</span><span className="json-sample-punctuation-marks">{quotes}</span>&nbsp;<span className="json-sample-punctuation-marks">{comma}</span></p>
                    <p className="json-sample-p">{tab}{tab}{tab}<span className="json-sample-punctuation-marks">{quotes}</span>elements<span className="json-sample-punctuation-marks">{quotes}</span>&nbsp;<span className="json-sample-punctuation-marks">{colon}</span>&nbsp;<span className="json-sample-square-brackets">{squareBracketOpen}</span></p>
                    <p className="json-sample-p">{tab}{tab}{tab}{tab}<span className="json-sample-punctuation-marks">{quotes}</span><span className="json-sample-span">element#1 name</span><span className="json-sample-punctuation-marks">{quotes}</span>&nbsp;<span className="json-sample-punctuation-marks">{comma}</span></p>
                    <p className="json-sample-p">{tab}{tab}{tab}{tab}<span className="json-sample-punctuation-marks">{quotes}</span><span className="json-sample-span">element#2 name</span><span className="json-sample-punctuation-marks">{quotes}</span>&nbsp;<span className="json-sample-punctuation-marks">{comma}</span></p>
                    <p className="json-sample-p">{tab}{tab}{tab}{tab}<span className="json-sample-punctuation-marks">{quotes}</span><span className="json-sample-span">element#3 name</span><span className="json-sample-punctuation-marks">{quotes}</span></p>
                    <p className="json-sample-p">{tab}{tab}{tab}<span className="json-sample-square-brackets">{squareBracketClose}</span></p>
                    <p className="json-sample-p">{tab}{tab}<span className="json-sample-curly-brackets">{curlyBracketsClose}</span>&nbsp;<span className="json-sample-punctuation-marks">{comma}</span></p>
                    <p className="json-sample-p">{tab}{tab}<span className="json-sample-curly-brackets">{curlyBracketsOpen}</span></p>
                    <p className="json-sample-p">{tab}{tab}{tab}<span className="json-sample-punctuation-marks">{quotes}</span>name<span className="json-sample-punctuation-marks">{quotes}</span>&nbsp;<span className="json-sample-punctuation-marks">{colon}</span>&nbsp;<span className="json-sample-punctuation-marks">{quotes}</span><span className="json-sample-span">branch#2 name</span><span className="json-sample-punctuation-marks">{quotes}</span>&nbsp;<span className="json-sample-punctuation-marks">{comma}</span></p>
                    <p className="json-sample-p">{tab}{tab}{tab}<span className="json-sample-punctuation-marks">{quotes}</span>elements<span className="json-sample-punctuation-marks">{quotes}</span>&nbsp;<span className="json-sample-punctuation-marks">{colon}</span>&nbsp;<span className="json-sample-square-brackets">{squareBracketOpen}</span></p>
                    <p className="json-sample-p">{tab}{tab}{tab}{tab}<span className="json-sample-punctuation-marks">{quotes}</span><span className="json-sample-span">element#1 name</span><span className="json-sample-punctuation-marks">{quotes}</span>&nbsp;<span className="json-sample-punctuation-marks">{comma}</span></p>
                    <p className="json-sample-p">{tab}{tab}{tab}{tab}<span className="json-sample-punctuation-marks">{quotes}</span><span className="json-sample-span">element#2 name</span><span className="json-sample-punctuation-marks">{quotes}</span></p>
                    <p className="json-sample-p">{tab}{tab}{tab}<span className="json-sample-square-brackets">{squareBracketClose}</span></p>
                    <p className="json-sample-p">{tab}{tab}<span className="json-sample-curly-brackets">{curlyBracketsClose}</span></p>
                    <p className="json-sample-p">{tab}<span className="json-sample-square-brackets">{squareBracketClose}</span></p>
                    <p className="json-sample-p"><span className="json-sample-curly-brackets">{curlyBracketsClose}</span></p>
                </div>
            </div>

        );
    };
};

