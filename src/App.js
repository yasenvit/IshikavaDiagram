import React, { Component } from 'react';
import ButtonAppBar from './components/MenuButton';
import FooterBar from './components/FooterBar';
import Home from './components/Home';
import GetManualData from './components/GetManualData';
import GetJsonData from './components/GetJsonData';
import './styling.css';

export default class App extends Component {

  state = {
    page: "home"
  };

  setPage = (page) => {
    this.setState({ page: page })
  };

  render() {
    const { page } = this.state;
    let pageName;
    if (page === "home") {
      pageName = <Home setPage={this.setPage} />
    } else if (page === "manual") {
      pageName = <GetManualData />
    } else if (page === "json") {
      pageName = <GetJsonData />
    };

    return (
      <div className="app">
        <ButtonAppBar toggleMenu={this.toggleMenu}
          setPage={this.setPage}
        />
        <div className="app-container">
          {pageName}
        </div>
        <FooterBar />
      </div >
    );
  };
};
