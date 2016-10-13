import React, { Component } from 'react';
import './App.css';
import Client from './Client';
import GovernorSearch from './GovernorSearch'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.changeInput = this.changeInput.bind(this);
    this.generateLetter = this.generateLetter.bind(this);
  }

  generateLetter(letterInfo) {
    if(typeof letterInfo === 'string') {
      this.setState({showLetterLink: false})
      this.setState({showError: true})
      this.setState({errorMessage: letterInfo})
    } else {
      Client.generate(letterInfo, (letter) => {
        if (typeof letter === 'string'){
          this.setState({showLetterLink: false})
          this.setState({showError: true})
          this.setState({errorMessage: letter})
        } else {
          this.setState({showError: false})
          this.setState({letterUrl: letter.url})
          this.setState({showLetterLink: true})
        }
      });
    }
  }

  changeInput(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    let urlDiv;
    if (this.state.showLetterLink) {
      urlDiv = <div className="download">
                  Here is your link to download your letter!<br/>
                <a href={this.state.letterUrl} target="_blank">Download Letter</a>
               </div>
    } else if (this.state.showError) {
      urlDiv = <div className="error">The following error occurred: <br/>"{this.state.errorMessage}"</div>;
    }
    return (
      <div className="App">
        <div className="App-header">
          <img src="https://s3-us-west-2.amazonaws.com/lob-assets/LobLogoLightSmall.png" className="App-logo" alt="logo" />
          <h2>Welcome to the Governor Mailing App!</h2>
        </div>
        <GovernorSearch governor={this.generateLetter}/>
        {urlDiv}
      </div>
    );
  }
}
