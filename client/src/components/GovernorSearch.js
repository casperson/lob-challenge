import React, { Component } from 'react';
import './GovernorSearch.css';
import { usStates } from '../states.js';
import { countries } from '../countries.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    const API_KEY = 'AIzaSyD0qN69RkHfP1tz6E4HCYJvxbmmyRXhhak';

    this.state = {name: '', address1: '', address2: '', city: '',
                  state: '', zipcode: '', country: '', message: '', key: API_KEY};
    this.changeInput = this.changeInput.bind(this);
    this.search = this.search.bind(this);
  }

  search(event) {
    event.preventDefault();
    let that = this;
    let sender = {
      name: this.state.name,
      address1: this.state.address1,
      address2: this.state.address2,
      city: this.state.city,
      state: this.state.state,
      zipcode: this.state.zipcode,
      country: this.state.country,
      message: this.state.message
    }
    let letterData = [sender];

    const addressString = `${this.state.address1} ${this.state.address2} ${this.state.city} ${this.state.state} ${this.state.zipcode}`;
    const queryString = `${addressString}&key=${this.state.key}&roles=headOfGovernment&levels=administrativeArea1`;

    fetch(`https://www.googleapis.com/civicinfo/v2/representatives?address=${queryString}`)
      .then(result => {
          result.json().then(function(data) {
            if(data.error){
              that.props.governor(data.error.message);
            } else {
              letterData.push(data.officials[0]);
              that.props.governor(letterData);
            }
          });
      }).catch(err => {
        console.log("smoky");
        this.setState({civicError: err.json().errors[0].message})
      })
  }

  changeInput(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    const statesOptions = usStates.map((state) => (
      <option value={state.short}>{ state.name }</option>
    ))
    const countriesOptions = countries.map((country) => (
      <option value={country.code}>{ country.name }</option>
    ))

    return (
      <div>
        <form onSubmit={this.search}>
          <p>
            <label className="search__field"><span className="search__label">Name</span>
              <input type="text" className="search__input" placeholder="Name" name="name" value={this.state.name} onChange={this.changeInput} required/>
            </label>
          </p>
          <p>
            <label className="search__field"><span className="search__label">Address Line 1</span>
              <input type="text" className="search__input" placeholder="Address Line 1" name="address1" value={this.state.address1} onChange={this.changeInput} required/>
            </label>
          </p>
          <p>
            <label className="search__field"><span className="search__label">Address Line 2</span>
              <input type="text" className="search__input" placeholder="Ex: Apt. 13 (Don't use #)" name="address2" value={this.state.address2} onChange={this.changeInput} />
            </label>
          </p>
          <p>
            <label className="search__field"><span className="search__label">City</span>
              <input type="text" className="search__input" placeholder="City" name="city" value={this.state.city} onChange={this.changeInput} required/>
            </label>
          </p>
          <p>
            <label className="search__field"><span className="search__label">State</span>
              <select type="text" className="search__input" name="state" value={this.state.state} onChange={this.changeInput} required>{statesOptions}</select>
            </label>
          </p>
          <p>
            <label className="search__field"><span className="search__label">Zipcode</span>
              <input type="text" className="search__input" placeholder="Zipcode" name="zipcode" value={this.state.zipcode} onChange={this.changeInput} required/>
            </label>
          </p>
          <p>
            <label className="search__field"><span className="search__label">Country</span>
              <select type="text" className="search__input" name="country" value={this.state.country} onChange={this.changeInput} required>{countriesOptions}</select>
            </label>
          </p>
          <p>
            <label className="search__field"><span className="search__label">Message</span>
              <textarea className="search__textarea" type="text" placeholder="Message" name="message" value={this.state.message} onChange={this.changeInput} />
            </label>
          </p>
          <p>
            <input className="search__button" type="submit" value="Send Letter"/>
          </p>
        </form>
      </div>
    );
  }
}
