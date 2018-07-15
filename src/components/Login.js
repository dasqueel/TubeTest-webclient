import React from 'react';
import axios from 'axios';
import { apiUrl } from '../config';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // email: '',
      username: '',
      password: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputValidation = this.inputValidation.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  inputValidation() {
    if (this.state.password.length < 1) return false;
    if (this.state.username.length < 1) return false;
    return true;
  }
  handleSubmit() {
    // check for valid inputs: email > 4 characters, passwords are the same, etc...
    if (this.inputValidation) {
      // do http request to sign in and get token
      const payload = {
        // email: this.state.email,
        username: this.state.username,
        password: this.state.password
      }
      axios
        .post(`${apiUrl}/login`, payload)
        .then(resp => {
          // make sure the username and email hasnt already been taken
          if (resp.status === 401) {
            // check for the failure
            alert(resp);
          }
          else {
            console.log('setting tubetestjwt: ', resp.data.token);
            // set the token to localstorage
            localStorage.setItem("tubetestjwt", resp.data.token);

            // redirect to home page
            this.props.history.push('/home');
          }
        })
        .catch(err => console.log(err));
    }
    else {
      alert('username and password fields must be filled');
    }

  }

  render() {
    return(
      <div>
        <label>
          username:
          <input name="username" type="text" value={this.state.username} onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          password:
          <input name="password" type="password" value={this.state.password} onChange={this.handleInputChange} />
        </label>
        <br />
        <button id="submitQstBtn" onClick={this.handleSubmit}>submit</button>
      </div>
    )
  }
}